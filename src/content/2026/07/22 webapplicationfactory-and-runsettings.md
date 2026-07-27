---
date: 2026-07-22
---

::post-title{:date="date"}
# WebApplicationFactory and Runsettings
::

<br/>

On the project that I'm working on, I intended to have an integration test. But I never built one before and wondering what's the best way to do it for .NET.

<br/>

To do integration test, the idea is we need to deploy the application and write an automation and run it against the deployed application.However, in my case, since the project is a library project, it needs an application that references it. And I don't want to have two additional projects.

<br/>

So, a quick search introduced me to WebApplicationFactory which I can use in my test project. First, I created a regular Program.cs that defines all the pre-launch configurations and services, so I can use dependency injection in the tests.

<br/>

Next, I used WebApplicationFactory to launch the Program for each test case.

::code-block
```
[TestInitialize]
public void Setup()
{
  var factory = WebApplicationFactory<Program>();

  var service = factory.ServiceProvider.GetRequiredSerice<ISomeService>();
}
```
::

<br/>

To learn more on integration test for .NET: [https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-10.0&pivots=xunit]{.text-blue-600}

<br/>

After that, I'm wondering how I can have an environment variable to hold some sensitive information since there's no launchSettings that comes with the project. I might be able to use appSettings.json and I don't want to set it on my machine's environment variable.

<br/>

That's when I found runsettings which allows me to add environment variables for tests. I also added it to .gitignore to prevent sensitive information being checked in into the repository.

<br/>

So, I created .runsettings file and placed it on the root of the solution.

::code-block
```
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
  <RunConfiguration>
    <EnvironmentVariables>
      <ASPNETCORE_ENVIRONMENT>Development</ASPNETCORE_ENVIRONMENT>
    </EnvironmentVariables>
  </RunConfiguration>
</RunSettings>
```
::

<br/>

With .runsettings file on the root of the solution, running test through Visual Studio will automatically detect it and use it. To use runsettings when running tests from command line, it needs to be specified using --settings option.

::code-block
```
dotnet test --settings .runsettings
```
::

<br/>

For more information on runsettings: [https://learn.microsoft.com/en-us/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file?view=visualstudio]{.text-blue-600}


