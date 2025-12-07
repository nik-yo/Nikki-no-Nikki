---
date: 2025-12-06
---

::post-title{:date="date"}
# ASP.NET Dockerfile for Local and CI/CD
::

<br/>

Finally my application is ready to be deployed. To make it portable, it needs to be containerized, so I'm working on Dockerfile.

<br/>

To get a jumpstart, I copied the Dockerfile from [https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-10.0#the-dockerfile]{.text-blue-600}. Then I'm thinking to test it locally with the following command:

::code-block
```
docker build -t app:latest .
```
::

<br/>

However, it throws few error messages:

::code-block
```
error MSB4018: The "ResolvePackageAssets" task failed unexpectedly.

error MSB4018: NuGet.Packaging.Core.PackagingException: Unable to find fallback package folder 'C:\Program Files (x86)\Microsoft Visual Studio\Shared\NuGetPackages'
```
::

<br/>

Ok, it's weird that it's looking for windows path when the image is linux based. I quickly found out that since the COPY step runs locally, it copies the `bin`{.bg-gray-200 .p-2 .rounded} and `obj`{.bg-gray-200 .p-2 .rounded} directories as well which was generated from my local Windows machine and thus incompatible with the Linux based image.

<br/>

To prevent that, I tried using `.dockerignore`{.bg-gray-200 .p-2 .rounded} file and place it on the same directory as the Dockerfile. Since in dockerignore file, leading and trailing slashes are disregarded, I just need the following content. For more information: [https://docs.docker.com/build/concepts/context/#syntax]{.text-blue-600}

::code-block
```
*/bin
*/obj
```
::

<br/>

Re-building it locally throws yet another error:

::code-block
```
error NETSDK1047: Assets file '/source/path/to/app/obj/project.assets.json' doesn't have a target for 'net10.0/linux-x64'. Ensure that restore has run and that you have included 'net10.0' in the TargetFrameworks for your project. You may also need to include 'linux-x64' in your project's RuntimeIdentifiers.
```
::

<br/>

I checked the .csproj file of my application and it doesn't have `<RuntimeIdentifier>linux-x64</RuntimeIdentifier>`{.bg-gray-200 .p-2 .rounded}. Probably because my local development machine is Windows. Since I need it to be able to run in both Windows (local) and Linux (remote), I tried the following:

::code-block
```
<RuntimeIdentifier>linux-x64;win-x64</RuntimeIdentifier>
```
::

Which is supposed to be valid, but the build failed again. This time the message is:

::code-block
```
The "HasTrailingSlash" function only accepts a scalar value, but its argument "$(OutputPath)" evaluates to "bin\Debug/net10.0/linux-x64;win-x64/" which is not a scalar value.
```
::

<br/>

Alright, removed `<RuntimeIdentifier>`{.bg-gray-200 .p-2 .rounded} tag. On CI/CD pipeline, I'll use the Dockerfile, for local development, I'll just use Visual Studio or dotnet CLI, so I can add `--os linux`{.bg-gray-200 .p-2 .rounded} option to dotnet restore step. In the Dockerfile, it becomes:

::code-block
```
...
RUN dotnet restore --os linux
...
```
::

<br/>

Then it builds successfully on my local machine. Since `bin`{.bg-gray-200 .p-2 .rounded} and `obj`{.bg-gray-200 .p-2 .rounded} directories are not tracked by the version control, the CI/CD pipeline won't have to worry about them.
