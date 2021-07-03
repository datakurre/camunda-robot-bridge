import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import dotenv from "dotenv";

import client, { subscribe } from "./client";

dotenv.config();

const TOPICS = (process.env.CLIENT_TOPIC || "Search for XKCD image,Download XKCD image").split(",");
const ROBOT =
  process.env.CLIENT_ROBOT ||
  path.join(__dirname, "..", "robot", "result", "bin", "robot");
const SUITE =
  process.env.CLIENT_SUITE || path.join(__dirname, "..", "robot", "xkcd.robot");
const LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "debug";
const CAMUNDA_API_PATH =
  process.env.CAMUNDA_API_PATH || "http://localhost:8080/engine-rest";

for (const topic of TOPICS) {
  (async () => {
    for await (const { task, taskService } of subscribe(client, topic)) {
      // Task lock expiration in milliseconds
      const lockExpiration =
        new Date(task.lockExpirationTime as string).getTime() -
        new Date().getTime();

      // Schedule lock expiration extender
      const extendLock = async () => {
        await taskService.extendLock(task, lockExpiration);
        extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
        console.log("Extended lock for", task.id);
      };
      let extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);

      // Create tmpdir
      const tmpdir = await fs.mkdtempSync(path.join(os.tmpdir(), "robot-"));

      // Execute robot
      const args = [
        "--rpa",
        "--loglevel",
        LOG_LEVEL,
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
        "--task",
        task.topicName || "n/a",
        SUITE,
      ];

      const exec = spawn(ROBOT, args, {
        cwd: tmpdir,
        env: {
          CAMUNDA_API_PATH,
        },
      });

      let stdout = "";
      exec.stdout.on("data", (data) => {
        stdout += data;
      });

      let stderr = "";
      exec.stderr.on("data", (data) => {
        stderr += data;
      });

      // Clear timeout and remove tmpdir on exit
      exec.on("close", async (code) => {
        clearTimeout(extendLockTimeout);
        fs.rmdirSync(tmpdir, { recursive: true });
        if (code !== 0) {
          await taskService.handleFailure(task, {
            errorMessage: `${stdout || stderr}`,
            errorDetails: `${stderr || stdout}`,
          });
          fs.rmdirSync(tmpdir, { recursive: true });
        }
        console.log(`child process exited with code ${code}`);
        console.log(stdout);
        console.log(stderr);
      });

      console.log("Scheduled", task.topicName, task.id);
    }
  })();
}
