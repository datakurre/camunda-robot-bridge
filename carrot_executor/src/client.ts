import { Client, HandlerArgs, logger } from "camunda-external-task-client-js";
import dotenv from "dotenv";

dotenv.config();

const CAMUNDA_API_PATH =
  process.env.CAMUNDA_API_PATH || "http://localhost:8080/engine-rest";

const CLIENT_LOG_LEVEL = process.env.CLIENT_LOG_LEVEL || "debug";
const CLIENT_MAX_TASKS = parseInt(process.env.CLIENT_MAX_TASKS || "4", 10) || 4;
const CLIENT_POLL_INTERVAL =
  parseInt(process.env.CLIENT_POLL_INTERVAL || "10000", 10) || 10000;
const CLIENT_WORKER_ID = process.env.CLIENT_WORKER_ID || "carrot-executor";

const client = new Client({
  baseUrl: CAMUNDA_API_PATH,
  workerId: CLIENT_WORKER_ID,
  maxTasks: CLIENT_MAX_TASKS,
  maxParallelExecutions: CLIENT_MAX_TASKS,
  interval: CLIENT_POLL_INTERVAL,
  lockDuration: CLIENT_POLL_INTERVAL,
  autoPoll: true,
  interceptors: undefined,
  asyncResponseTimeout: CLIENT_POLL_INTERVAL,
  use: (logger as any).level(CLIENT_LOG_LEVEL),
});

export default client;

export async function* subscribe(
  client: Client,
  topic: string,
  options?: any
): AsyncIterable<HandlerArgs> {
  // Define asynchronous lock
  const locker: (() => void)[] = [];
  const Lock = () =>
    new Promise<void>((resolve) => {
      locker.push(resolve);
    });

  // Subscribe topic, push to queue, release lock
  const queue: HandlerArgs[] = [];
  const subscription = client.subscribe(
    topic,
    options || {},
    async function (payload) {
      queue.push(payload);
      let release;
      while ((release = locker.shift())) release();
    }
  );

  // Consume queue, wait for lock
  let payload;
  try {
    while (true) {
      while ((payload = queue.shift())) {
        yield payload;
      }
      await Lock();
    }
  } finally {
    subscription.unsubscribe();
  }
}
