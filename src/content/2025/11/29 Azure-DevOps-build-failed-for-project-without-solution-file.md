---
date: 2025-11-29
---

::post-title{:date="date"}
# Azure DevOps Build Failed for Project without Solution File
::

::notes
This is a repost from my old blog. First posted in 1/20/2020.
::

<br/>

Our company has been using Azure DevOps as a source control server. Only lately, I have been expanding our usage to take advantage of its CI/CD offerings. It went smoothly until I bumped into a project that has no solution file. 

<br/>

The project without solution file failed the Visual Studio Build task even when it has the same settings as other projects with solution file. 

<br/>

I started by verifying settings from the Solution field. It does says that it can use MSBuild project. Since I was using VB.NET, I point it to .vbproj file.

<br/>

Next is the Platform field, which according to the info bubble, I can specify "any cpu".

<br/>

Last is the Configuration field. Since I want a Release build, I can specify "release" according to the info bubble.

<br/>

The same values, with the exception of the Solution field, work well if I point the task to a solution file but break when I point it to a project file. Part of the error message is:

::code-block
```
Please check to make sure that you have specified a valid combination of Configuration and Platform for this project.  Configuration='release'  Platform='any cpu'.  You may be seeing this message because you are trying to build a project without a solution file, and have specified a non-default Configuration or Platform that doesn't exist for this project.
```
::

<br/>

The error message indeed stated that the Configuration and Platform values are invalid. But it builds just fine locally without a solution file. Granted, Visual Studio will create a temporary solution file when opening a project file. 

<br/>

Since it built fine locally, I decided to check inside the project file to find the values used.

<br/>

The project file does use "Release" instead of "release" and "AnyCPU" instead of "any cpu". So, I gave it a try and the build was successful. 

<br/>

Opening the solution file reveals the use of "Release" and "Any CPU", so the values might be case insensitive, but I didn't give it a try.

<br/>

And my solution is:

- If pointing to solution file, use "release" as Configuration and "any cpu" as Platform
- If pointing to project file, use "Release" as Configuration and "AnyCPU" as Platform
