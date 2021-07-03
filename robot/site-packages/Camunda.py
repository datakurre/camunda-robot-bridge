"""Camunda External Task Library."""
from base64 import b64encode
from CamundaOpenAPI import FetchExternalTasksDto
from CamundaOpenAPI import FetchExternalTaskTopicDto
from CamundaOpenAPI import LockedExternalTaskDto
from CamundaOpenAPI import PatchVariablesDto
from CamundaOpenAPI import ValueType
from CamundaOpenAPI import VariableValueDto
from robot.libraries.BuiltIn import BuiltIn
from robot.libraries.DateTime import convert_time
from typing import Any
from typing import Dict
from typing import List
from typing import Optional
import datetime
import json
import mimetypes
import os
import requests


try:
    CAMUNDA_API_PATH = os.environ["CAMUNDA_API_PATH"]
except KeyError as e:
    raise RuntimeError(
        "CAMUNDA_API_PATH environment variable not set. "
        "It must be an URL for Camunda REST API root, for example, "
        '"http://camunda:8080/engine_rest".'
    ) from e
CAMUNDA_TASK_ERROR_CODE = "${CAMUNDA_TASK_ERROR_CODE}"
CAMUNDA_TASK_ERROR_MESSAGE = "${CAMUNDA_TASK_ERROR_MESSAGE}"
CAMUNDA_TASK_EXECUTION_ID = "${CAMUNDA_TASK_EXECUTION_ID}"
CAMUNDA_TASK_ID = "${CAMUNDA_TASK_ID}"
CAMUNDA_TASK_PROCESS_INSTANCE_ID = "${CAMUNDA_TASK_PROCESS_INSTANCE_ID}"
CAMUNDA_TASK_RETRIES = "${CAMUNDA_TASK_RETRIES}"
CAMUNDA_TASK_WORKER_ID = "${CAMUNDA_TASK_WORKER_ID}"


def datetime_handler(value):
    """Datetime and date serializer for json.dumps."""
    if isinstance(value, datetime.date):
        return value.strftime("%Y-%m-%dT00:00:00.000Z")
    if isinstance(value, datetime.datetime):
        return value.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    raise TypeError(f"Object of type {type(value)} is not JSON serializable")


class Camunda:
    """Camunda External Task Library allows fetching external tasks
    and their variables from Camunda Platform, and returning variables
    back to Camunda.

    This library is designed to be used together with CamundaListener,
    which manages completing tasks on the base of Robot Framework RPA
    execution result:

        $ robot --rpa --listener CamundaListener ...

    """

    ROBOT_LIBRARY_SCOPE = "TASK"

    def fetch_and_lock_external_task(
        self,
        topic: str,
        worker_id: str = "robot",
        timeout: str = "10 s",
        lock: str = "60 s",
        **variables,
    ):
        """Fetch and lock single Camunda external task. Successful fetch
        sets required suite level variables to allow calling the other
        keywords by this library.

        *topic* is the topic (queue) name for the task to fetch.

        *worker_id* is the worker id name used when locking the task at Camunda.

        *timeout* is the time to wait for a new task if one is not immediately
        available. The value should be in Robot Framework time format.

        *timeout* is the time to keep the task locked at Camunda, before
        it can be locked again (unless it has been completed).
        The value should be in Robot Framework time format.

        Any other keyword arguments are passed as additional process
        *variables* filter to select available tasks with the same topic.
        """
        url = f"{CAMUNDA_API_PATH}/external-task/fetchAndLock"
        payload = FetchExternalTasksDto(
            workerId=worker_id,
            maxTasks=1,
            asyncResponseTimeout=convert_time(timeout) * 1000,
            topics=[
                FetchExternalTaskTopicDto(
                    topicName=topic,
                    lockDuration=convert_time(lock) * 1000,
                    deserializeValues=False,
                    variables=[],
                    processVariables=variables if variables else None,
                )
            ],
        )
        headers = {"Accept": "application/json", "Content-Type": "application/json"}
        response = requests.post(url, headers=headers, data=payload.json())
        assert response.status_code == 200, f"{response.status_code}: {response.text}"

        # Set task variables for CamundaLibrary
        tasks: List[LockedExternalTaskDto] = [
            LockedExternalTaskDto(**task) for task in response.json()
        ]
        builtin = BuiltIn()
        if not tasks:
            builtin.skip("No external tasks available.")
        for task in tasks:
            builtin.set_suite_variable(CAMUNDA_TASK_WORKER_ID, worker_id)
            builtin.set_suite_variable(CAMUNDA_TASK_ID, task.id)
            builtin.set_suite_variable(CAMUNDA_TASK_EXECUTION_ID, task.executionId)
            builtin.set_suite_variable(
                CAMUNDA_TASK_PROCESS_INSTANCE_ID, task.processInstanceId
            )

    def set_external_task_bpmn_error(self, code: str, message: str):
        """Set to raise BPMN error on Camunda external task completion."""
        BuiltIn().set_suite_variable(CAMUNDA_TASK_ERROR_CODE, code)
        BuiltIn().set_suite_variable(CAMUNDA_TASK_ERROR_MESSAGE, message)

    def set_external_task_retries_on_failure(self, retries: int):
        """Set to retry given times on Camunda external task failure."""
        BuiltIn().set_suite_variable(CAMUNDA_TASK_RETRIES, retries)

    def get_external_task_variable(self, name: str) -> Any:
        """Read an external task variable value from Camunda.

        If name points to a file variable at Camunda, the file is downloaded
        onto the current working directory and relative path to the file is
        returned.
        """
        headers = {"Accept": "application/json", "Content-Type": "application/json"}
        params = {"deserializeValue": "false"}
        variables = BuiltIn().get_variables()
        url = (
            f"{CAMUNDA_API_PATH}/execution/"
            f"{variables[CAMUNDA_TASK_EXECUTION_ID]}/localVariables/{name}"
        )
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 404:
            url = (
                f"{CAMUNDA_API_PATH}/process-instance/"
                f"{variables[CAMUNDA_TASK_PROCESS_INSTANCE_ID]}/variables/{name}"
            )
            response = requests.get(url, headers=headers, params=params)
        assert response.status_code == 200, response.text
        variable = VariableValueDto(**response.json())
        if (
            variable.valueInfo
            and variable.valueInfo.get("serializationDataFormat") == "application/json"
            or variable.type == ValueType.Json
        ):
            return json.loads(variable.value)
        elif variable.type == ValueType.Date:
            return datetime.datetime.fromisoformat(variable.value)
        elif (
            variable.type == ValueType.File
            and variable.valueInfo
            and variable.valueInfo.get("filename")
        ):
            url = f"{url}/data"
            response = requests.get(url)
            assert response.status_code == 200, response.text
            with open(variable.valueInfo["filename"], "wb") as fp:
                fp.write(response.content)
            return variable.valueInfo["filename"]
        return variable.value

    def set_external_task_variable(
        self, name: str, value: Any, type: ValueType = ValueType.String
    ) -> Any:
        """Write an external task variable value to Camunda.

        With *type=File*, value must be absolute or relative path to the file
        to be submitted to Camunda.
        """
        headers = {"Accept": "application/json", "Content-Type": "application/json"}
        variables = BuiltIn().get_variables()
        info = None
        if isinstance(type, str):
            type = ValueType(type.lower().title())
        if type == ValueType.Json:
            value = json.dumps(value, default=datetime_handler)
        elif type == ValueType.Date:
            if isinstance(value, datetime.date):
                value = value.strftime("%Y-%m-%dT00:00:00.000Z")
            elif isinstance(value, datetime.datetime):
                value = value.astimezone(datetime.timezone.utc).strftime(
                    "%Y-%m-%dT%H:%M:%S.%fZ"
                )[:-3]
        elif type == ValueType.File:
            assert os.path.exists(value), "File variable value must be a path"
            info = {
                "filename": os.path.basename(value),
                "mimetype": mimetypes.guess_type(value)[0] or "text/plain",
                "encoding": "UTF-8",
            }
            with open(value, "rb") as fp:
                value = b64encode(fp.read())
        variable = VariableValueDto(value=value, type=type, valueInfo=info)
        url = (
            f"{CAMUNDA_API_PATH}/execution/"
            f"{variables[CAMUNDA_TASK_EXECUTION_ID]}/localVariables"
        )
        payload = PatchVariablesDto(modifications={name: variable})
        response = requests.post(url, headers=headers, data=payload.json())
        assert response.status_code == 204, response.text
