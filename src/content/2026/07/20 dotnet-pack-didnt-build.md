---
date: 2026-07-20
---

::post-title{:date="date"}
# Dotnet Pack Din't Build
::

<br/>

My team is a assigned a small project to build a NuGet package. And since I'm familiar with DevOps practice, I took the initiative to build the CI/CD pipeline.

<br/>

Our client has a standard pipeline that needs to be incorporated. The standard pipeline stage for NuGet only runs `dotnet pack`{.bg-gray-200 .p-2 .rounded} and it's failing. The error message indicated that it can't find the dll.

<br/>

Checking various online documentation and discussion, `dotnet pack`{.bg-gray-200 .p-2 .rounded} is supposed to do implicit build, so it should have produced the dll.

<br/>

After couples of back and forth with the engineer over at the client side, I happened to notice the following note at [dotnet pack](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-pack){.text-blue-600} page:

::notes
In some cases, the implicit build cannot be performed. This can occur when GeneratePackageOnBuild is set, to avoid a cyclic dependency between build and pack targets. The build can also fail if there is a locked file or other issue.
::

<br/>

And indeed, our project has `GeneratePackageOnBuild`{.bg-gray-200 .p-2 .rounded} since we wanted to make sure that our project indeed produce the package when run locally.

<br/>

Removing the `GeneratePackageOnBuild`{.bg-gray-200 .p-2 .rounded} property then allows  `dotnet pack`{.bg-gray-200 .p-2 .rounded} to implicitly build the project and produced the dll again.