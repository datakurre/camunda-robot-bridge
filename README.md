Camunda external task Robot Framework execution scheduler
=========================================================

**Technology preview.**

`carrot-executor` is an opinionated decoupled Camunda external task executor concept for scheduling Robot Framework RPA tasks. The concept separates task locking from the execution scheduling.

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgQ2Fycm90LT4-Q2FtdW5kYTogRmV0Y2ggYW5kIGxvY2tcbiAgICBDYW11bmRhLS0-PkNhcnJvdDogVGFza1xuICAgIHBhclxuICAgIENhcnJvdC0-PitFeGVjdXRvcjogU2NoZWR1bGVcbiAgICBFeGVjdXRvci0-PitSb2JvdDogRXhlY3V0ZVxuICAgIFJvYm90LT4-Q2FtdW5kYTogR2V0IHRhc2sgdmFyaWFibGVcbiAgICBDYW11bmRhLS0-PlJvYm90OiBWYXJpYWJsZSB2YWx1ZVxuICAgIFJvYm90LT4-Q2FtdW5kYTogU2V0IHRhc2sgdmFyaWFibGVcbiAgICBhbHRcbiAgICBSb2JvdC0-PkNhbXVuZGE6IENvbXBsZXRlIHRhc2tcbiAgICBlbmRcbiAgICBhbHRcbiAgICBSb2JvdC0-PkNhbXVuZGE6IEhhbmRsZSBmYWlsdXJlXG4gICAgZW5kXG4gICAgYWx0XG4gICAgUm9ib3QtPj5DYW11bmRhOiBIYW5kbGUgQlBNTiBlcnJvclxuICAgIGVuZFxuICAgIFJvYm90LS0-Pi1FeGVjdXRvcjogW2V4aXQgY29kZV1cbiAgICBlbmRcbiAgICBsb29wIFxuICAgIENhcnJvdC0-PkV4ZWN1dG9yOiBQb2xsIHN0YXR1c1xuICAgIGFsdFxuICAgIEV4ZWN1dG9yLS0-PkNhcnJvdDogW3BlbmRpbmddXG4gICAgQ2Fycm90LT4-Q2FtdW5kYTogRXh0ZW5kIGxvY2tcbiAgICBlbmRcbiAgICBhbHRcbiAgICBFeGVjdXRvci0tPj4tQ2Fycm90OiBbY29tcGxldGVkXVxuICAgIGVuZFxuICAgIGVuZCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/edit/##eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgQ2Fycm90LT4-Q2FtdW5kYTogRmV0Y2ggYW5kIGxvY2tcbiAgICBDYW11bmRhLS0-PkNhcnJvdDogVGFza1xuICAgIHBhclxuICAgIENhcnJvdC0-PitFeGVjdXRvcjogU2NoZWR1bGVcbiAgICBFeGVjdXRvci0-PitSb2JvdDogRXhlY3V0ZVxuICAgIFJvYm90LT4-Q2FtdW5kYTogR2V0IHRhc2sgdmFyaWFibGVcbiAgICBDYW11bmRhLS0-PlJvYm90OiBWYXJpYWJsZSB2YWx1ZVxuICAgIFJvYm90LT4-Q2FtdW5kYTogU2V0IHRhc2sgdmFyaWFibGVcbiAgICBhbHRcbiAgICBSb2JvdC0-PkNhbXVuZGE6IENvbXBsZXRlIHRhc2tcbiAgICBlbmRcbiAgICBhbHRcbiAgICBSb2JvdC0-PkNhbXVuZGE6IEhhbmRsZSBmYWlsdXJlXG4gICAgZW5kXG4gICAgYWx0XG4gICAgUm9ib3QtPj5DYW11bmRhOiBIYW5kbGUgQlBNTiBlcnJvXG4gICAgZW5kXG4gICAgUm9ib3QtLT4-LUV4ZWN1dG9yOiBbZXhpdCBjb2RlXVxuICAgIGVuZFxuICAgIGxvb3AgXG4gICAgQ2Fycm90LT4-RXhlY3V0b3I6IFBvbGwgc3RhdHVzXG4gICAgYWx0XG4gICAgRXhlY3V0b3ItLT4-Q2Fycm90OiBbcGVuZGluZ11cbiAgICBDYXJyb3QtPj5DYW11bmRhOiBFeHRlbmQgbG9ja1xuICAgIGVuZFxuICAgIGFsdFxuICAgIEV4ZWN1dG9yLS0-Pi1DYXJyb3Q6IFtjb21wbGV0ZWRdXG4gICAgZW5kXG4gICAgZW5kIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

In this concept, Carrot external task client, based on [camunda-external-task-client-js](https://github.com/camunda/camunda-external-task-client-js) fetches configured external tasks from Camunda, schedules their execution, and keeps the tasks locked at Camunda until their executor has been completed. The Carrot external task client only completes task (by creating incident) by itself when the scheduling fails with unexpected reason. Any other interaction with Camunda is done by the scheduled Robot Framework bot, mostly using a dedicated Robot Framework listener library.

This initial preview provides support for local parallel task execution, but the concept is designed to support also remote executors, like parameterized Nomad tasks, CI systems, Docker or even Robocloud API.

Requirements:

* Docker with Docker Compose for Camunda

* Python >= 3.8 for executing Robot Framework

  ```bash
  $ python --version
  Python 3.8.8
  ```

* NodeJS >= 12 for executing the external task client

  ```
  $ node --version
  v12.21.0
  ```


Trying it out
=============

While `carrot-executor` itself can be installed from PyPI, trying out the concept requires setting up Camunda BPM Platform and having the example Robot Framework task suites.

The easiest way for all this is to clone or download the project repository and starting the preconfigured Camunda with Docker Compose:

```bash
$ git clone https://github.com/datakurre/carrot-executor
$ cd carrot-executor
$ docker-compose up
```

After everything is ready, there should be Camunda running at http://localhost:8080/camunda with username `demo` and password `demo`.

By default, our Camunda container has both theirs and ours demo processes deployed. Let's get rid of their demo processes:

1. Open Camunda Tasklist: http://localhost:8080/camunda/app/tasklist/default/
2. Choose **Start process**
3. Choose **Reset Camunda to clear state** and
4. Press **Start**

The started process could now be completed with the help of `carrot-executor`. For that we need to create a new Python environment with our package:

```bash
$ python -m venv my-carrot-executor
$ source my-carrot-executor/bin/activate
$ pip install carrot-executor
```

The executor may now be started with parameterizing it to complete tasks from the process we started:

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

By default, the executor executes the task name matching with the subscribed topic name. This can be overridden with environment variable `ROBOT_TASK`. Setting the variable empty, should execute full suite.
