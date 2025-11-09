---
date: 2025-09-13
---

::post-title{:date="date"}
# ASP.Net Migration Error
::

::notes
This is a repost from my old blog. First posted in 9/30/2016.
::

<br />

I did a lot of updates on my project and since I use Entity Framework Code First, I depend on migration commands. This time, my Visual Studio suddenly does not recognize the commands. I have the following error message when attempting to enable migration:

::code-block
```
The term 'Enable-Migrations' is not recognized as the name of a cmdlet, function, script file, or operable program
```
::

Some people say to reinstall entity framework with the following command:

::code-block
```
Install-Package EntityFramework -IncludePrerelease
```
::

But it didn't work for me since I have it installed, so I find a way to force reinstall the package which works! The command as follow:

::code-block
```
Update-Package -reinstall EntityFramework -IncludePrerelease
```
::