---
date: 2026-09-20
---

::post-title{:date="date"}
# Multiple Aspire CLI
::

<br/>

I was on Aspire Cli 13.0.2 and it prompted me that a new version, 13.5.4, is available. So, I updated using the command:

::code-block
```
aspire update --self
```
::

<br/>

It ran successfully, but when I run `aspire --version`{.bg-gray-200 .p-2 .rounded}, it still show 13.0.2. So, I thought probably the terminal needs to be restarted. However, that doesn't fix it.

<br/>

Apparently, there can be two different aspire cli installation. One is through the native script and second is through dotnet tools.

<br/>

Native script installs in this location: `%USERPROFILE%\.aspire\bin`{.bg-gray-200 .p-2 .rounded}. While dotnet tools will install in this location: `%USERPROFILE%\.dotnet\tools`{.bg-gray-200 .p-2 .rounded}.

<br/>

In my case, the update updated the aspire in the native script location, but when running it, the dotnet tools version is preferred, so I uninstall the one in dotnet tools using the command:

::code-block
```
dotnet tool uninstall --global Aspire.Cli
```
::

<br/>

And that fixed the confusion that I experienced. Now my Aspire CLI version is expected: 13.5.4.