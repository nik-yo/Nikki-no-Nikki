---
date: 2025-12-26
---

::post-title{:date="date"}
# NuGet Package Reference NU6105 Publish Error
::

::notes
This is a repost from my old blog. First posted in 11/11/2020.
::

<br/>

Some of my .NET Core applications are already using PackageReference which is a very nice idea. However, through a combination of packages, Visual Studio did not allow me to publish my project although it built fine.

<br/>

During publish, it threw error on NU6105 warning. Along with that most of it comes with the following message:

::code-block
```
Detected package downgrade
```
::

<br/>

Some developers solve it by finding which package caused the issue and manually added them through NuGet, but I find them troublesome until I found the following article:

[https://docs.microsoft.com/en-us/nuget/reference/errors-and-warnings/nu1605]{.text-blue-600}

<br/>

In my case, all I need to do to solve it is to install the following NuGet package: 

::code-block
```
Microsoft.NETCore.Targets
```
::