import { Task } from "camunda-external-task-client-js";
import dotenv from "dotenv";
import * as rest from "typed-rest-client";
import { IRequestOptions } from "typed-rest-client";

import * as api from "./ProcessAPI";

type RobocorpError = api.components["schemas"]["RobocorpError"];
type ProcessStartResponse = api.components["schemas"]["ProcessStartResponse"];
type ProcessRun = api.components["schemas"]["ProcessRun"];

dotenv.config();

const ROBOT_LOG_LEVEL = process.env.ROBOT_LOG_LEVEL || "info";

const ROBOCLOUD_WORKSPACE_ID = process.env.ROBOCLOUD_WORKSPACE_ID;
const ROBOCLOUD_PROCESS_ID = process.env.ROBOCLOUD_PROCESS_ID;
const ROBOCLOUD_API_KEY = process.env.ROBOCLOUD_API_KEY;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const execute = async (task: Task) => {
  if (ROBOT_LOG_LEVEL === "debug") {
    console.log("Robocloud", "received", task.topicName, task.id);
  }

  if (!ROBOCLOUD_WORKSPACE_ID) {
    console.log("Environment variable ROBOCLOUD_WORKSPACE_ID must be set.");
    process.exit(1);
  }

  if (!ROBOCLOUD_PROCESS_ID) {
    console.log("Environment variable ROBOCLOUD_PROCESS_ID must be set.");
    process.exit(1);
  }

  if (!ROBOCLOUD_API_KEY) {
    console.log("Environment variable ROBOCLOUD_API_KEY must be set.");
    process.exit(1);
  }

  const workItem = {
    variables: {
      CAMUNDA_TASK_ID: task.id,
      CAMUNDA_TASK_RETRIES: Math.max(
        task.retries ? (task.retries || 1) - 1 : 0,
        0
      ),
      CAMUNDA_TASK_WORKER_ID: task.workerId,
      CAMUNDA_TASK_PROCESS_INSTANCE_ID: task.processInstanceId,
      CAMUNDA_TASK_EXECUTION_ID: task.executionId,
    },
  };

  const options: IRequestOptions = {
    additionalHeaders: {
      Authorization: `RC-WSKEY ${ROBOCLOUD_API_KEY}`,
    },
  };

  const client = new rest.RestClient(
    "carrot-executor",
    "https://api.eu1.robocorp.com/process-v1/",
    []
  );

  const run = await client.create<ProcessStartResponse | RobocorpError>(
    `workspaces/${ROBOCLOUD_WORKSPACE_ID}/processes/${ROBOCLOUD_PROCESS_ID}/runs`,
    workItem,
    options
  );

  const id = (run.result as ProcessStartResponse).id;

  if (ROBOT_LOG_LEVEL === "debug") {
    console.log("Robocloud", "scheduled", task.topicName, task.id, id);
  }

  let state = null;
  while (state !== "COMPL") {
    await sleep(5000);
    try {
      const status = await client.get<ProcessRun | RobocorpError>(
        `workspaces/${ROBOCLOUD_WORKSPACE_ID}/processes/${ROBOCLOUD_PROCESS_ID}/runs/${id}`,
        options
      );
      state = (status.result as ProcessRun).state;
      if (ROBOT_LOG_LEVEL === "debug") {
        console.log("Robocloud", "state", task.topicName, task.id, id, state);
      }
    } catch (e) {
      console.error(e.toString(), e.stack, JSON.stringify(e));
    }
  }
};

export default execute;
