---
date: 2026-02-06
---

::post-title{:date="date"}
# Error When Generating OpenAPI Documents: Missing required option '--project'
::

::notes
This is a repost from my old blog. First posted in 11/15/2024.
::

<br/>

After I installed Microsoft.Extensions.ApiDescription.Server package, I encountered the following error message when I attempted to generate OpenAPI documents at build-time on .NET 9.

::code-block
```
Missing required option '--project'
The command "dotnet "..."" exited with code 1
```
::

<br/>

Apparently, it was due to end slash on my attempt to change the output directory. On my csproj file, I have the following entry:

::code-block
```
<PropertyGroup>
  <OpenApiDocumentsDirectory>../directory/</OpenApiDocumentsDirectory>
</PropertyGroup>
```
::

It works correctly after I removed the end slash:

::code-block
```
<PropertyGroup>
  <OpenApiDocumentsDirectory>../directory</OpenApiDocumentsDirectory>
</PropertyGroup>
```
::