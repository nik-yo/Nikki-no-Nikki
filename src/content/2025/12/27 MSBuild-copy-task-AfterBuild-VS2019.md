---
date: 2025-12-27
---

::post-title{:date="date"}
# MSBuild Copy Task AfterBuild VS2019
::

::notes
This is a repost from my old blog. First posted in 11/11/2020.
::

<br/>

This time the issue is with MSBuild task that I set up in one of my project (in the project file). The task is to copy the dll to a different location after build is done. I copied the configuration over to a different project and guess what, it didn't work.

<br/>

It worked flawlessly for a very long time with the following configuration:

::code-block
```
<Target Name="AfterBuild">
  <Copy SourceFiles="..." DestinationFolder="..." />
</Target>
```
::

Two main differences between the two projects are the working on is a .NET Framework project and built in VS2017. The new one is a .NET Standard and built in VS2019. Apparently, there is a change for VS2019 that comes with updated MSBuild. It is no longer depends on the target name (it is a bad idea anyway) to determine when to execute the task. I update it to the following and then it works great.

::code-block
```
<Target Name="AnyNameIsFine" AfterTargets="Build">
  <Copy SourceFiles="..." DestinationFolder="..." />
</Target>
```
::

For reference:

[https://docs.microsoft.com/en-us/visualstudio/msbuild/copy-task?view=vs-2019]{.text-blue-600}