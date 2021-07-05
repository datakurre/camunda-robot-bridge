*** Settings ***

Library  requests

*** Tasks ***

Delete all tasklist filters
    ${response}  Get  %{CAMUNDA_API_PATH}/filter
    Should be equal  ${response.status_code}  ${200}
    ${filters}=  Set variable  ${response.json()}
    FOR  ${filter}  IN  @{filters}
      IF  "${filter}[name]" != "All Tasks"
        ${response}=  Delete  %{CAMUNDA_API_PATH}/filter/${filter}[id]
        Should be equal  ${response.status_code}  ${204}
      END
    END

Delete all deployments
    ${response}  Get  %{CAMUNDA_API_PATH}/deployment
    Should be equal  ${response.status_code}  ${200}
    ${deployments}=  Set variable  ${response.json()}
    ${params}=  Create dictionary  cascade=true
    FOR  ${deployment}  IN  @{deployments}
      IF  "${deployment}[source]" == "process application"
        ${response}=  Delete  %{CAMUNDA_API_PATH}/deployment/${deployment}[id]  params=${params}
        Should be equal  ${response.status_code}  ${204}
      END
    END
