*** Settings ***

Library  Camunda
Library  requests

*** Tasks **

Reset tasklist filters
    ${auth}=  Get API Auth
    ${response}  Get  %{CAMUNDA_API_BASE_URL}/filter  auth=${auth}
    Should be equal  ${response.status_code}  ${200}
    ${filters}=  Set variable  ${response.json()}
    FOR  ${filter}  IN  @{filters}
      IF  "${filter}[name]" != "All Tasks"
        ${response}=  Delete  %{CAMUNDA_API_BASE_URL}/filter/${filter}[id]  auth=${auth}
        Should be equal  ${response.status_code}  ${204}
      END
    END

Reset deployments
    ${auth}=  Get API Auth
    ${response}  Get  %{CAMUNDA_API_BASE_URL}/deployment  auth=${auth}
    Should be equal  ${response.status_code}  ${200}
    ${deployments}=  Set variable  ${response.json()}
    ${params}=  Create dictionary  cascade=true
    FOR  ${deployment}  IN  @{deployments}
      IF  "${deployment}[source]" == "process application"
        ${response}=  Delete  %{CAMUNDA_API_BASE_URL}/deployment/${deployment}[id]  params=${params}  auth=${auth}
        Should be equal  ${response.status_code}  ${204}
      END
    END
