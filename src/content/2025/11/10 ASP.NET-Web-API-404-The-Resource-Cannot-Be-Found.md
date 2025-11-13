---
date: 2025-11-10
---

::post-title{:date="date"}
# ASP.NET Web API 404 The Resource Cannot Be Found
::

::notes
This is a repost from my old blog. First posted in 1/20/2020.
::

<br/>

I have an old ASP.NET Web API 2 which I would like to update with OWIN. As usual, it didn't go smoothly.

<br/>

After updating to OWIN, it somehow threw a 404 error. I spent hours trying various things as stated below but none works.
- Verified the order of route registration
- Attempted to use Route attributes
- Applied runAllManagedModulesForAllRequests="true" on modules tag in web.config
- Made sure spelling, Nuget packages and imports are correct
- Checked with a brand new Web API project to make sure code are correct

<br/>

At the end, I remembered that I accidentally hit "Create Virtual Directory" when the Project Url field was set to "http://localhost:xxxxx/api" and using IIS Express. I suspect the virtual directory was the issue. After few online searches, I found the virtual directory was set in:

::code-block
```
<solution folder>/.vs/config/applicationhost.config. 
```
::

Removing the virtual directory solves my 404 issue.
