---
date: 2026-01-08
---

::post-title{:date="date"}
# App.config File Transformation in Azure DevOps
::

::notes
This is a repost from my old blog. First posted in 2/17/2021.
::

<br/>

Utilizing the right tool for the right job makes life easier. That also means we have to keep learning and exploring new tools.

<br/>

For some if not many of us, we probably wish we can do config file transformation on app.config for various environment just like web.config. To do that locally, we can use something like SlowCheetah, but in my case, I want to do it before deploying to the server. 

<br/>

So I use Azure DevOps File Transform task. Learning from my experience with web.config, I added couple of transformation file such as App.Prod.config. It took couple of tries for me to get it working right and the following are the steps I take:

1. Add transformation file and set its **Copy to Output Directory** property to Always.
2. Since App.config is usually renamed to `<ApplicationName>.exe.config`{.bg-gray-200 .p-2 .rounded} and File transform task requires config files to follow certain naming pattern, for example, `App.<environment>.config`{.bg-gray-200 .p-2 .rounded} can only be used to transform App.config, I set **Copy to Output Directory** property of App.config file to Always. Another option is probably to change the transformation file name but it doesn't look nice locally.
3. Set the transformation rules of the File Transform task to: `-transform **/App.Prod.config -xml **/App.config -result <appname>.exe.config`{.bg-gray-200 .p-2 .rounded}

**Reference**

[https://stackoverflow.com/questions/57498234/file-transform-task-fails-to-transform-xml-configurations-on-zipped-package]{.text-blue-600}