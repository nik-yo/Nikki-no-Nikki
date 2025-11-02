---
date: 2025-11-02
---

::post-title{:date="date"}
# Aspire.Hosting package version 9.0.0 is not supported
::

Today, I try the dedicated Aspire Cli. The installation went smoothly with:

::code-block
```
dotnet tool install -g Aspire.Cli --prerelease
```
::

For more information: [https://learn.microsoft.com/en-us/dotnet/aspire/cli/install]{.text-blue-600}

<br/>

Running Aspire project is easy as well as I can be at any parent directory/folder and simply run the following command and it will search for AppHost.csproj recursively.

::code-block
```
aspire run
```
::

<br/>

However, during my attempt, it throws the following error:

::code-block{:textColor="text-red-600"}
```
The Aspire.Hosting package version 9.0.0 is not supported. Please update to the latest version.
```
::

<br/>

So, I ensure all packages in my projects are updated to the latest, but it didn't work. I found out later that the Sdk was not updated as I still found the following entry in my AppHost.csproj file even after all packages updated to version 9.5.2.

::code-block
```
<Sdk Name="Aspire.AppHost.Sdk" Version="9.0.0" />
```
::

<br/>

Following the instructions in: [https://learn.microsoft.com/en-us/dotnet/aspire/get-started/upgrade-to-aspire-9?pivots=dotnet-cli]{.text-blue-600}, I updated the version manually to 9.5.2 so it becomes:

::code-block
```
<Sdk Name="Aspire.AppHost.Sdk" Version="9.5.2" />
```
::

<br/>

Rerun the `aspire run`{.bg-gray-200 .p-2 .rounded} command and voilà! Back and running.
