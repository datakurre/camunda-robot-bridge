import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import { Task } from "camunda-external-task-client-js";
import dotenv from "dotenv";

dotenv.config();

const CAMUNDA_API_BASE_URL = process.env.CAMUNDA_API_BASE_URL;
const CAMUNDA_API_AUTHORIZATION = process.env.CAMUNDA_API_AUTHORIZATION;

const ROBOT_EXECUTABLE = process.env.ROBOT_EXECUTABLE || "robot";
const ROBOT_SUITE = process.env.ROBOT_SUITE;
const ROBOT_TASK = process.env.ROBOT_TASK || undefined;
const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "info";

const toAbsolute = (p: string): string =>
  fs.existsSync(p) && !path.isAbsolute(p) ? path.join(process.cwd(), p) : p;

const execute = async (task: Task) => {
  if (!ROBOT_SUITE) {
    console.log("Environment variable ROBOT_SUITE must be set.");
    process.exit(1);
  }
  if (!fs.existsSync(ROBOT_SUITE)) {
    console.log(`Suite ${ROBOT_SUITE} does not exist.`);
    process.exit(1);
  }

  await new Promise<void>(async (resolve, reject) => {
    if (ROBOT_LOG_LEVEL === "debug") {
      console.log("Local executor", task.topicName, task.id);
    }
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
          task.retries ? (task.retries || 1) - 1 : 0,
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

    // handle exit
    exec.on("close", async (code) => {
      // Remove temporary task work directory
      fs.rmdirSync(tmpdir, { recursive: true });

      // fail task if execution fail unexpectedly
      if (code !== 0) {
        reject(stdout || stderr);
      } else {
        resolve();
      }

      if (ROBOT_LOG_LEVEL === "debug") {
        console.log(stdout + stderr);
      }
    });
  });
};

export default execute;
