---
date: 2025-11-05
---

::post-title{:date="date"}
# Install Previous Version of Nuget Package that is not Visible
::

::notes
This is a repost from my old blog. First posted in 11/27/2019.
::

<br/>

Sometimes a new software version also introduces a new bug and we need to rollback. And this time is on one of the Nuget package that we use.

<br/>

When troubleshooting MySql Nuget package issue, I noticed that I can't revert back to the previous version using the version drop down under Nuget manager window in Visual Studio. 

<br/>

So, a bit of searching reminds me that I can use the Package Manager Console to install a package. Maybe I can specify the version and the server still has it. So I uninstall the latest package and ran the following command:

::code-block
```
Install-Package <package_name> -Version <version> -Source nuget.org
```
::

The source option is optional. In my case, somehow I had it defaulted to some other source so I have to actually specify it in the command. Hit enter and I got the previous version installed. Problem solved!