---
date: 2025-10-06
---

::post-title{:date="date"}
# Invoke-WebRequest PowerShell Command through AWS System Manager
::

::notes
This is a repost from my old blog. First posted in 10/25/2018.
::

<br/>

I had a small issue with running Invoke-WebRequest through Amazon AWS System Manager. Somehow it doesn't seem to load the module properly.

<br/>

I ended up replacing:

::code-block
```
Invoke-WebRequest -Uri <url>
```
::

with:

::code-block
```
$WebClient = New-Object System.Net.WebClient
$WebClient.DownloadString(<uri>)
```
::

which works perfectly for my case.

