Camunda external task Robot Framework execution scheduler
=========================================================

**Technology preview.**

`carrot-executor` is a decoupled Camunda external task executor concept for scheduling Robot Framework RPA tasks. The concept separates task locking from the execution scheduling.

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgQ2Fycm90LT4-Q2FtdW5kYTogRmV0Y2ggYW5kIGxvY2tcbiAgICBDYW11bmRhLS0-PkNhcnJvdDogVGFza1xuICAgIENhcnJvdC0-PitFeGVjdXRvcjogU2NoZWR1bGVcbiAgICBDYXJyb3QtPj5FeGVjdXRvcjogUG9sbCBzdGF0dXNcbiAgICBFeGVjdXRvci0tPj5DYXJyb3Q6IFtwZW5kaW5nXVxuICAgIENhcnJvdC0-PkNhbXVuZGE6IEV4dGVuZCBsb2NrXG4gICAgRXhlY3V0b3ItPj4rUm9ib3Q6IEV4ZWN1dGVcbiAgICBSb2JvdC0-PkNhbXVuZGE6IEdldCB0YXNrIHZhcmlhYmxlXG4gICAgQ2FtdW5kYS0tPj5Sb2JvdDogVmFyaWFibGUgdmFsdWVcbiAgICBSb2JvdC0-PkNhbXVuZGE6IFNldCB0YXNrIHZhcmlhYmxlXG4gICAgUm9ib3QtPj5DYW11bmRhOiBDb21wbGV0ZSB0YXNrXG4gICAgUm9ib3QtLT4-LUV4ZWN1dG9yOiBbZXhpdCBjb2RlXVxuICAgIENhcnJvdC0-PkV4ZWN1dG9yOiBQb2xsIHN0YXR1c1xuICAgIEV4ZWN1dG9yLS0-Pi1DYXJyb3Q6IFtjb21wbGV0ZWRdIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjp0cnVlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6dHJ1ZX0)](https://mermaid-js.github.io/mermaid-live-editor/edit#)

In this concept, Carrot external task client, based on [camunda-external-task-client-js](https://github.com/camunda/camunda-external-task-client-js) fetches tasks from Camunda, schedules the execution, and keeps the task locked until the executor has completed. But the Carrot external task client only completes task when the scheduling fails for unexpected reason, by creating an incident. Any other interaction with Camunda is done by the scheduled Robot Framework bot.

This initial preview provides support for local parallel task execution, but the concept is designed to support also remote executors, like parameterized Nomad tasks, CI systems, Docker or even Robocloud API.

Requirements:

* Docker with Docker Compose

* Python >= 3.8

  ```bash
  $ python --version
  Python 3.8.8
  ```

* NodeJS >= 12

  ```
  $ node --version
  v12.21.0
  ```


Trying it out
=============

While `carrot-executor` has been released at PyPI, trying out the concept requires setting up Camunda BPM Platform and Robot Framework task suites.

The easies way for that is to clone or download the project repository and starting the preconfigured Camunda with Docker Compose:

```bash
$ git clone https://github.com/datakurre/carrot-executor
$ cd carrot-executor
$ docker-compose up
```

After everything is ready, there should be Camunda running at http://localhost:8080/camunda with username `demo` and password `demo`.

In the beginning, Camunda in this demo has both theirs and ours demo processes deployed. Let's get rid of Camunda's demo process:

1. Open Camunda Tasklist:http://localhost:8080/camunda/app/tasklist/default/
2. Choose **Start process**
3. Choose **Reset Camunda to clear state** and
4. Press **Start**

The started process could now be completed with the help of `carrot-executor`. For that we need to create a new Python env with our package:

```bash
$ python -m venv my-carrot-executor
$ source my-carrot-executor/bin/activate
$ pip install carrot-executor
```

The executor may now started with parameterizing it to complete tasks from the process we started:

```bash
$ CAMUNDA_API_PATH=http://localhost:8080/engine-rest ROBOT_SUITE=$(pwd)/robot/reset.robot CAMUNDA_TOPIC="Delete all tasklist filters,Delete all deployments" carrot-executor
polling
✓ subscribed to topic Delete all tasklist filters
✓ subscribed to topic Delete all deployments
polling
✓ polled 2 tasks
polling
✓ polled 0 tasks
```
