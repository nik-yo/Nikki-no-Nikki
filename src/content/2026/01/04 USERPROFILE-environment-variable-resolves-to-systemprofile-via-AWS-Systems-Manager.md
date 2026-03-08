---
date: 2026-01-04
---

::post-title{:date="date"}
# USERPROFILE Environment Variable Resolves to C:\windows\system32\config\systemprofile via AWS Systems Manager
::

::notes
This is a repost from my old blog. First posted in 2/15/2021.
::

<br/>

Context is important which is why different environment can and will produce different values. This time it happened when I ran a PowerShell script through AWS Systems Manager (SSM).

<br/>

I intended to download a file reliably to Downloads directory through PowerShell script and AWS Systems Manager. 

<br/>

At first, it seems straight forward, SSM Agent usually runs as ssm-user with administrator privilege. And USERPROFILE environment variable usually resolves to `C:\Users\<username>`{.bg-gray-200 .p-2 .rounded}, well, at least locally. So, $env:USERPROFILE\Downloads should work as intended. 

<br/>

But it isn't so in my particular case. Instead, it resolves to `C:\windows\system32\config\systemprofile\Downloads`{.bg-gray-200 .p-2 .rounded} which of course doesn't exist and failed.

<br/>

I also tried using $HOME and it resolves to the same path as $env:USERPROFILE.

<br/>

Reading online, there are indicators that it happened on some machines and not the others. And also, this behavior has been around for a while.

<br/>

Some solutions online suggest tweaking the registry but in my case, I'd rather not do that which might complicate the issue further.

<br/>

And some solutions suggest using the Public user folder and another option is to use ProgramData folder. Both options are not very clear for my use case.

<br/>

In the end, I decided to use and create a custom directory if it doesn't exist using the following script:

::code-block
```
$DownloadDirectory="C:\temp"
if (!(Test-Path $DownloadDirectory)) {
    New-Item -ItemType directory -Path $DownloadDirectory
}
```
::

Of course, it will fail if somehow the SSM agent doesn't have permission to create a directory, but in my case, this is acceptable.