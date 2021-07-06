import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import dotenv from "dotenv";

import client, { subscribe } from "./client";

dotenv.config();

const CAMUNDA_API_BASE_URL = process.env.CAMUNDA_API_BASE_URL;
const CAMUNDA_API_AUTHORIZATION = process.env.CAMUNDA_API_AUTHORIZATION;
const CAMUNDA_TOPIC = (process.env.CAMUNDA_TOPIC || "")
  .split(",")
  .map((topic: string) => topic.trim())
  .filter((topic: string) => topic);

if (!CAMUNDA_API_BASE_URL) {
  console.log("Environment variable CAMUNDA_API_BASE_URL must be set.");
  process.exit(1);
}

if (!CAMUNDA_TOPIC.length) {
  console.log("Environment variable CAMUNDA_TOPIC must be set.");
  process.exit(1);
}

// Note: The following variables are specific to local executor:
const ROBOT_EXECUTABLE = process.env.ROBOT_EXECUTABLE || "robot";
const ROBOT_SUITE = process.env.ROBOT_SUITE;
const ROBOT_TASK = process.env.ROBOT_TASK || undefined;
const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "info";

if (!ROBOT_SUITE) {
  console.log("Environment variable ROBOT_SUITE must be set.");
  process.exit(1);
}
if (!fs.existsSync(ROBOT_SUITE)) {
  console.log(`Suite ${ROBOT_SUITE} does not exist.`);
  process.exit(1);
}

const toAbsolute = (p: string): string =>
  fs.existsSync(p) && !path.isAbsolute(p) ? path.join(process.cwd(), p) : p;

for (const topic of CAMUNDA_TOPIC) {
  (async () => {
    for await (const { task, taskService } of subscribe(client, topic)) {
      // Resolve lock expiration
      const lockExpiration =
        new Date(task.lockExpirationTime as string).getTime() -
        new Date().getTime();

      // Schedule to extend lock expiration in time
      const extendLock = async () => {
        if (ROBOT_LOG_LEVEL === "debug") {
          console.log("Extend lock", task.topicName, task.id);
        }
        await taskService.extendLock(task, lockExpiration);
        extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
      };
      let extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);

      // Note: Local executor specific code begins

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
          `CAMUNDA_TASK_RETRIES:${Math.max(
            task.retries ? task.retries - 1 : 0,
            0
          )}`,
          "--variable",
          `CAMUNDA_TASK_WORKER_ID:${task.workerId}`,
          "--variable",
          `CAMUNDA_TASK_PROCESS_INSTANCE_ID:${task.processInstanceId}`,
          "--variable",
          `CAMUNDA_TASK_EXECUTION_ID:${task.executionId}`,
        ].concat(
          ROBOT_TASK === undefined
            ? ["--task", task.topicName as string, toAbsolute(ROBOT_SUITE)]
            : ROBOT_TASK !== ""
            ? ["--task", ROBOT_TASK as string, toAbsolute(ROBOT_SUITE)]
            : [toAbsolute(ROBOT_SUITE)]
        ),
        {
          cwd: tmpdir,
          env: {
            CAMUNDA_API_BASE_URL,
            CAMUNDA_API_AUTHORIZATION,
            PATH: process.env.PATH,
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
          if (ROBOT_LOG_LEVEL === "debug") {
            console.log("Fail task for", task.topicName, task.id);
            console.log(stdout + stderr);
          }
          await taskService.handleFailure(task, {
            errorMessage: `${stdout || stderr}`,
            errorDetails: `${stderr || stdout}`,
          });
        }
        if (ROBOT_LOG_LEVEL === "debug") {
          console.log(stdout + stderr);
        }
      });
      if (ROBOT_LOG_LEVEL === "debug") {
        console.log("Locked", task.topicName, task.id);
      }
    }
  })();
}
