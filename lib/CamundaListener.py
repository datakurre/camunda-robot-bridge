"""Robot Framework Camunda Nomad Client Listener."""
from CamundaOpenAPI import CompleteExternalTaskDto
from CamundaOpenAPI import ExternalTaskFailureDto
from CamundaOpenAPI import PatchVariablesDto
from CamundaOpenAPI import TaskBpmnErrorDto
from CamundaOpenAPI import ValueType
from CamundaOpenAPI import VariableValueDto
from enum import Enum
from PIL import Image
from robot import rebot
from robot.api import logger
from robot.errors import RobotError
from robot.libraries.BuiltIn import BuiltIn
from robot.result.model import TestCase as TestCaseResult
from robot.result.model import TestSuite as TestSuiteResult
from robot.running.model import TestCase as TestCaseData
from robot.running.model import TestSuite as TestSuiteData
from typing import List
from typing import Optional
from urllib.parse import unquote
import base64
import binascii
import os
import re
import requests
import sys


def data_uri(mimetype: str, data: bytes):
    """Return a data URI with given mimetype for given bytes."""
    return "data:{};base64,{}".format(mimetype, base64.b64encode(data).decode("utf-8"))


def inline_screenshots(output: str):
    """Update given output.xml in-place by inlining screenshot references found in it."""
    path = os.path.dirname(output)
    cwd = os.getcwd()
    with open(output) as fp:
        xml = fp.read()
    for src in re.findall('img src="([^"]+)', xml):
        if os.path.exists(src):
            filename = src
        elif os.path.exists(os.path.join(path, src)):
            filename = os.path.join(path, src)
        elif os.path.exists(os.path.join(cwd, src)):
            filename = os.path.join(cwd, src)
        elif src.startswith("data:"):
            filename = None
            try:
                spec, uri = src.split(",", 1)
                spec, encoding = spec.split(";", 1)
                spec, mimetype = spec.split(":", 1)
                if not (encoding == "base64" and mimetype.startswith("image/")):
                    continue
                data = base64.b64decode(unquote(uri).encode("utf-8"))
            except (binascii.Error, IndexError, ValueError):
                continue
        else:
            continue
        if filename:
            im = Image.open(filename)
            mimetype = Image.MIME[im.format]
            # Fix issue where Pillow on Windows returns APNG for PNG
            if mimetype == "image/apng":
                mimetype = "image/png"
            with open(filename, "rb") as fp:
                data = fp.read()
        else:
            mimetype = "image/png"
        uri = data_uri(mimetype, data)
        xml = xml.replace('a href="{}"'.format(src), "a")
        xml = xml.replace(
            'img src="{}" width="800px"'.format(src),
            'img src="{}" style="max-width:800px;"'.format(uri),
        )  # noqa: E501
        xml = xml.replace('img src="{}"'.format(src), 'img src="{}"'.format(uri))
    with open(output, "w") as fp:
        fp.write(xml)


try:
    CAMUNDA_API_BASE_URL = os.environ["CAMUNDA_API_BASE_URL"]
    CAMUNDA_API_AUTHORIZATION = os.environ.get("CAMUNDA_API_AUTHORIZATION")
except KeyError as e:
    raise RuntimeError(
        "CAMUNDA_API_BASE_URL environment variable not set. "
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


def auth(r: requests.models.Request) -> requests.models.Request:
    """Set Authorization header for Camunda API request from environment variable."""
    if CAMUNDA_API_AUTHORIZATION:
        r.headers["Authorization"] = CAMUNDA_API_AUTHORIZATION
    return r


class Status(str, Enum):
    """Suite execution status."""

    PASS = "PASS"
    FAIL = "FAIL"
    SKIP = "SKIP"


class CamundaListener:
    """Camunda listener."""

    ROBOT_LISTENER_API_VERSION = 3

    def __init__(self):
        """Init listener."""
        self.errors: List[str] = []
        self.output: Optional[str] = None
        self.status: Status = Status.PASS
        self.retries: Optional[int] = None

        # Task identification variables
        self.task_id: str = ""
        self.execution_id: str = ""
        self.worker_id: str = ""

        # BPMN error to raise, when set variables are set
        self.error_code: Optional[str] = None
        self.error_message: Optional[str] = None

    def set_retries_on_failure(self, retries: int):
        """Set automatic retries on failure."""
        self.retries = retries

    def end_test(self, data: TestCaseData, result: TestCaseResult):
        """Save possible test execution failure and error messages.

        Called when a test case ends."""
        if not result.passed and result.message:
            self.errors.append(result.message)

    def end_suite(self, data: TestSuiteData, result: TestSuiteResult):
        """Save possible suite execution and error messages.

        Called when a test suite ends."""
        if not result.passed:
            self.status = Status.FAIL
            if result.message:
                self.errors.append(result.message)

        # Update external task completion variables
        builtin = BuiltIn()
        self.task_id = builtin.get_variable_value(CAMUNDA_TASK_ID)
        self.execution_id = builtin.get_variable_value(CAMUNDA_TASK_EXECUTION_ID)
        self.worker_id = builtin.get_variable_value(CAMUNDA_TASK_WORKER_ID)
        self.retries = builtin.get_variable_value(CAMUNDA_TASK_RETRIES)
        self.error_code = builtin.get_variable_value(CAMUNDA_TASK_ERROR_CODE)
        self.error_message = builtin.get_variable_value(CAMUNDA_TASK_ERROR_MESSAGE)

    def output_file(self, path):
        """Save output.xml path when it has been created.

        Called when writing to an output file is ready."""
        self.output = path

    def close(self):
        """Report execution result to Camunda.

        Called when the whole test execution ends."""
        try:
            self._close()
        except Exception as e:  # noqa
            logger.debug(e)
            sys.exit(255)

    def _close(self):
        """Report execution result to Camunda."""
        # 0)
        if self.status == Status.SKIP:
            return

        # 1)
        logger.debug("CamundaListener: Close started:")
        assert self.task_id
        assert self.execution_id
        assert self.worker_id
        headers = {"Accept": "application/json", "Content-Type": "application/json"}

        # 2)
        logger.debug("CamundaListener: * process log.html")
        inline_screenshots(self.output)
        path = os.path.join(os.path.dirname(self.output), "log.html")
        rebot(
            self.output,
            rpa=True,
            logtitle=f"Robot Log",
            name="Robot",
            report=None,
            output=None,
            log=path,
        )

        # 3)
        logger.debug("CamundaListener: * submit log.html")
        with open(path, "rb") as fp:
            log_html = VariableValueDto(
                value=base64.b64encode(fp.read()),
                type=ValueType.File,
                valueInfo={
                    "filename": "log.html",
                    "mimetype": "text/html",
                    "encoding": "utf-8",
                },
            )
        url = f"{CAMUNDA_API_BASE_URL}/execution/{self.execution_id}/localVariables"
        payload = PatchVariablesDto(modifications={"log": log_html})
        response = requests.post(url, headers=headers, data=payload.json(), auth=auth)
        if response.status_code != 204:
            raise RobotError(f"{response.status_code} {response.text}")

        # 4)
        task_url = f"{CAMUNDA_API_BASE_URL}/external-task/{self.task_id}"
        if self.error_code and self.error_message:
            logger.debug("CamundaListener: * report BPMN error")
            url = f"{task_url}/bpmnError"
            payload = TaskBpmnErrorDto(
                workerId=self.worker_id,
                variables={},
                errorCode=self.error_code,
                errorMessage=self.error_message,
            )
        elif self.status == Status.PASS:
            logger.debug("CamundaListener: * report complete")
            url = f"{task_url}/complete"
            payload = CompleteExternalTaskDto(
                workerId=self.worker_id, variables={}, localVariables={},
            )
        else:
            logger.debug("CamundaListener: * report failure")
            url = f"{task_url}/failure"
            payload = ExternalTaskFailureDto(
                workerId=self.worker_id,
                variables={},
                localVariables={},
                errorMessage=f"{self.status}".lower(),
                errorDetails="\n".join(self.errors),
                retries=self.retries or 0,
            )
            logger.debug(url)
            logger.debug(headers)
            logger.debug(payload.json())
        response = requests.post(url, headers=headers, data=payload.json(), auth=auth)
        logger.debug(f"CamundaListener: {response}")
        if response.status_code != 204:
            logger.debug("CamundaListener: * report error")
            url = f"{task_url}/failure"
            payload = ExternalTaskFailureDto(
                workerId=self.worker_id,
                variables={},
                localVariables={},
                errorMessage="error",
                errorDetails=response.text,
                retries=0,
            )
            response = requests.post(
                url, headers=headers, data=payload.json(), auth=auth
            )
            if response.status_code != 204:
                raise RobotError(f"{response.status_code} {response.text}")

        # 5)
        logger.debug("CamundaListener: Close completed.")
