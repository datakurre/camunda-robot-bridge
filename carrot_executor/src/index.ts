import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import dotenv from "dotenv";

import client, { subscribe } from "./client";

dotenv.config();

const CAMUNDA_API_PATH =
  process.env.CAMUNDA_API_PATH || "http://localhost:8080/engine-rest";
const CAMUNDA_TOPIC = (
  process.env.CAMUNDA_TOPIC || "Search for XKCD image,Download XKCD image"
).split(",");

const ROBOT_EXECUTABLE = process.env.ROBOT_PATH || "robot";
const ROBOT_SUITE = process.env.ROBOT_SUITE || "n/a";
const ROBOT_TASK = process.env.ROBOT_TASK || undefined;
const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "debug";

for (const topic of CAMUNDA_TOPIC) {
  (async () => {
    for await (const { task, taskService } of subscribe(client, topic)) {
      // Resolve lock expiration
      const lockExpiration =
        new Date(task.lockExpirationTime as string).getTime() -
        new Date().getTime();

      // Schedule to extend lock expiration in time
      const extendLock = async () => {
        console.log("Extend lock", task.topicName, task.id);
        await taskService.extendLock(task, lockExpiration);
        extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
      };
      let extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);

      // Create temporary task work directory
      const tmpdir = await fs.mkdtempSync(path.join(os.tmpdir(), "robot-"));

      // Execute robot for task
      const exec = spawn(
        ROBOT_EXECUTABLE,
        [
          "--rpa",
          "--loglevel",
          ROBOT_LOG_LEVEL,
          "--nostatusrc",
          "--log",
          "NONE",
          "--report",
          "NONE",
          "--listener",
          "CamundaListener",
          "--variable",
          `CAMUNDA_TASK_ID:${task.id}`,
          "--variable",
          `CAMUNDA_TASK_RETRIES:${task.retries}`,
          "--variable",
          `CAMUNDA_TASK_WORKER_ID:${task.workerId}`,
          "--variable",
          `CAMUNDA_TASK_PROCESS_INSTANCE_ID:${task.processInstanceId}`,
          "--variable",
          `CAMUNDA_TASK_EXECUTION_ID:${task.executionId}`,
        ].concat(
          ROBOT_TASK === undefined
            ? ["--task", task.topicName as string, ROBOT_SUITE as string]
            : ROBOT_TASK !== ""
            ? ["--task", ROBOT_TASK as string, ROBOT_SUITE as string]
            : [ROBOT_SUITE as string]
        ),
        {
          cwd: tmpdir,
          env: {
            CAMUNDA_API_PATH,
          },
        }
      );

      // Collect stdout
      let stdout = "";
      exec.stdout.on("data", (data) => {
        stdout += data;
      });

      // Collect stderr
      let stderr = "";
      exec.stderr.on("data", (data) => {
        stderr += data;
      });

      // Handle exit
      exec.on("close", async (code) => {
        // Stop extending expiration timeout
        clearTimeout(extendLockTimeout);

        // Remove temporary task work directory
        fs.rmdirSync(tmpdir, { recursive: true });

        // Fail task if execution fail unexpectedly
        if (code !== 0) {
          console.log("Fail task for", task.topicName, task.id);
          console.log(stdout + stderr);
          await taskService.handleFailure(task, {
            errorMessage: `${stdout || stderr}`,
            errorDetails: `${stderr || stdout}`,
          });
        }
      });

      console.log("Locked ", task.topicName, task.id);
    }
  })();
}
