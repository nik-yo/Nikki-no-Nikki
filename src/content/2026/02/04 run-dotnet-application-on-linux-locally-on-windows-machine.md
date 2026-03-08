---
date: 2026-02-04
---

::post-title{:date="date"}
# Run .NET Application on Linux locally on Windows Machine
::

Back to the TimeZoneInfo. I need to test that TimeZoneInfo.FindSystemTimeZoneById() works on Alpine Linux locally. However, I can only use Windows machine. So, couple of options:

1. WSL
2. Docker Container

<br/>

We can use VM too, but it adds more work for a quick test. I decided to use docker since we already have Dockerfile. Besides, using WSL, we need to configure the networking and have to install .NET SDK which will take more time.

<br/>

To manage the docker container, we are allowed to use Podman. I'm more used to Docker Desktop, but it works and learning curves are not too steep. Another option is Rancher Desktop.

<br/>

However, I don't want to keep running cli command to build and run the containers, so I decided to use .NET Aspire. It requires a small configuration to integrate with Podman. Under `launchSettings.json`{.bg-gray-200 .p-2 .rounded}, I added the environment variable below. This way, I don't have to configure machine-wide environment variable.

::code-block
```
...

"ASPIRE_CONTAINER_RUNTIME": "podman"

...
```
::

<br/>

Then I create a custom Dockerfile with just enough steps for local build. In `AppHost.cs`{.bg-gray-200 .p-2 .rounded}, I added the following code to use the custom Dockerfile:

::code-block
```
var pathToProject = "C:/path/to/project";

builder.AddDockerfile("api", pathToProject, "Dockerfile.local")
  .WithBuildArg("PWD", $"{pathToProject}/.")
  .WithEnvironment("ASPNETCORE_ENVIRONMENT", "Development")
  .WithHttpEndpoint(80,8080);

...
```
::

<br/>

I exposed a build arg in my Dockerfile, so when Aspire builds the container, it doesn't attempt to use Aspire's directory as the application directory such as:

::code-block
```
ARG PWD="."

...

COPY ${PWD} .

...
```
::

<br/>

Finally, I simply ran Aspire and it handles building and running the container in a single click.