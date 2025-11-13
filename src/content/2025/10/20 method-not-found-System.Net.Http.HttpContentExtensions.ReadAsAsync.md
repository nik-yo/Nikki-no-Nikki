
---
date: 2025-10-20
---

::post-title{:date="date"}
# Method not found System.Net.Http.HttpContentExtensions.ReadAsAsync
::

::notes
This is a repost from my old blog. First posted in 3/30/2019.
::

<br/>

Bumped into this error when moving my web app to another server. It happened to me before but this time the cause is different. So two ways that worked for me:

1. Install package Microsoft.AspNet.WebApi.Client. This will provide access to HttpFormatting.dll which actually contains the ReadAsAsync method and fixed the issue for me before.

2. I found out that my System.Net.Http was not referenced properly because it depends on the dll installed in the machine. So, installing System.Net.Http NuGet package fix the current issue for me.
