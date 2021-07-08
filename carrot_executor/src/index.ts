import os from "os";

import { Client, Interceptor, logger } from "camunda-external-task-client-js";
import dotenv from "dotenv";

import local from "./local";
import robocloud from "./robocloud";

dotenv.config();

const CAMUNDA_API_BASE_URL =
  process.env.CAMUNDA_API_BASE_URL || "http://localhost:8080/engine-rest";
const CAMUNDA_API_AUTHORIZATION = process.env.CAMUNDA_API_AUTHORIZATION;
const CAMUNDA_TOPIC = (process.env.CAMUNDA_TOPIC || "")
  .split(",")
  .map((topic: string) => topic.trim())
  .filter((topic: string) => topic);

const CLIENT_LOG_LEVEL = process.env.CLIENT_LOG_LEVEL || "debug";
const CLIENT_MAX_TASKS = Math.max(
  parseInt(process.env.CLIENT_MAX_TASKS || `${os.cpus().length}`, 10) ||
    os.cpus().length,
  0
);
const CLIENT_POLL_INTERVAL =
  parseInt(process.env.CLIENT_POLL_INTERVAL || "10000", 10) || 10000;
const CLIENT_WORKER_ID = process.env.CLIENT_WORKER_ID || "carrot-executor";

const ROBOT_EXECUTOR = process.env.ROBOT_EXECUTOR || "local";
const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "info";

if (!CAMUNDA_API_BASE_URL) {
  console.log(
    "Environment variable CAMUNDA_API_BASE_URL must be set.",
    "error"
  );
  process.exit(1);
}

if (!CAMUNDA_TOPIC.length) {
  console.log("Environment variable CAMUNDA_TOPIC must be set.");
  process.exit(1);
}

const AuthorizationHeaderInterceptor: Interceptor = (config: any): any => {
  return CAMUNDA_API_AUTHORIZATION
    ? {
        ...config,
        headers: {
          ...config.headers,
          Authorization: CAMUNDA_API_AUTHORIZATION,
        },
      }
    : config;
};

const client = new Client({
  baseUrl: CAMUNDA_API_BASE_URL,
  workerId: CLIENT_WORKER_ID,
  maxTasks: CLIENT_MAX_TASKS,
  maxParallelExecutions: CLIENT_MAX_TASKS,
  interval: CLIENT_POLL_INTERVAL,
  lockDuration: CLIENT_POLL_INTERVAL,
  autoPoll: true,
  interceptors: [AuthorizationHeaderInterceptor],
  asyncResponseTimeout: CLIENT_POLL_INTERVAL,
  use: (logger as any).level(CLIENT_LOG_LEVEL),
});

const errors: Map<string, string> = new Map();
client.on("extendLock:error", ({ id }, e) => {
  if (id) {
    errors.set(id, `${e}`);
  }
});

for (const topic of CAMUNDA_TOPIC) {
  client.subscribe(topic, async ({ task, taskService }) => {
    if (ROBOT_LOG_LEVEL === "debug") {
      console.log("Received task", task.topicName, task.id);
    }

    // Resolve lock expiration
    const lockExpiration =
      new Date(task.lockExpirationTime as string).getTime() -
      new Date().getTime();

    // Extend lock expiration
    const extendLock = async () => {
      await taskService.extendLock(task, lockExpiration);

      // On error, stop extending lock expiration
      if (task.id && !errors.has(task.id)) {
        extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);
      } else if (task.id) {
        errors.delete(task.id);
      }
    };

    // Schedule initial lock expiration
    let extendLockTimeout = setTimeout(extendLock, lockExpiration / 2);

    // Delegate to executor
    try {
      await (ROBOT_EXECUTOR === "robocloud" ? robocloud(task) : local(task));
    } catch (e: any) {
      const error = {
        errorMessage: `${e}`,
        errorDetails: [`${e}`, e.stack, JSON.stringify(e)].join("\n"),
      };
      // Handle executor failing to start robot
      if (ROBOT_LOG_LEVEL === "debug") {
        console.log("Fail task for", task.topicName, task.id);
        console.log(error);
      }
      await taskService.handleFailure(task, error);
      if (ROBOT_LOG_LEVEL === "debug") {
        console.log("Failed task", task.topicName, task.id);
      }
    } finally {
      // Stop extending expiration timeout
      clearTimeout(extendLockTimeout);
      if (task.id && errors.has(task.id)) {
        errors.delete(task.id);
      }
      if (ROBOT_LOG_LEVEL === "debug") {
        console.log("Completed task", task.topicName, task.id);
      }
    }
  });
}
