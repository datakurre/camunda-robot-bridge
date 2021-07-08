*** Settings ***

Library  SeleniumLibrary  timeout=5s
...      plugins=SeleniumTestability;True;5s;True
Library  Camunda
Library  Collections
Library  OperatingSystem
Library  requests

Suite teardown  Close all browsers

*** Keywords ***

Run Selenium keyword and return status
    [Documentation]
    ...  Run Selenium keyword (optionally with arguments)
    ...  and return status without screenshots on failure
    [Arguments]  ${keyword}  @{arguments}
    ${tmp}=  Register keyword to run on failure  No operation
    ${status}=  Run keyword and return status  ${keyword}  @{arguments}
    Register keyword to run on failure  ${tmp}
    [Return]  ${status}

*** Tasks ***

Search for XKCD image
    Log variables
    ${query}=  Get external task variable  query

    Open browser  about:blank  browser=headlessfirefox

    Go to  https://www.google.com/search?q=site%3Am.xkcd.com+${query}
    Capture page screenshot

    ${has results}=  Run Selenium keyword and return status
    ...  Page should contain element
    ...  xpath://a[starts-with(@href, "https://m.xkcd.com/")]

    Run keyword if  ${has results} == False
    ...  Set external task BPMN error  not_found  No results found.

    ${count}=  Get Element Count  xpath://a[starts-with(@href, "https://m.xkcd.com/")]
    ${results}=  Create list
    FOR  ${index}  IN RANGE  ${count}
        ${href}=  Get Element Attribute
        ...  xpath:(//a[starts-with(@href, "https://m.xkcd.com/")])[${{${index} + 1}}]
        ...  href
        Append to list  ${results}  ${href}
    END
    Set external task variable  results  ${results}  type=Json

    Close browser

Download XKCD image
    ${url}=  Get external task variable  url

    Open browser  about:blank  browser=headlessfirefox
    Go to  ${url}
    Capture page screenshot

    ${has image}=  Run Selenium keyword and return status
    ...  Page should contain element
    ...  css:#comic img

    Run keyword if  ${has image} == False
    ...  Set external task BPMN error  not_found  Image not found.

    ${alt}=  Get Element Attribute  css:#comic img  alt
    ${title}=  Get Element Attribute  css:#comic img  title
    ${src}=  Get Element Attribute  css:#comic img  src
    Set external task variable  imageUrl  ${src}  type=String

    ${response}  Get  ${src}
    Create binary file  comic.png  ${response.content}
    Set external task variable  comic  comic.png  type=File
    Set external task variable  alt  ${alt}  type=String
    Set external task variable  title  ${title}  type=String

    Close browser
