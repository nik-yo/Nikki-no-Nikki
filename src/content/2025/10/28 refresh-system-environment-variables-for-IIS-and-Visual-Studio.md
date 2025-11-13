---
date: 2025-10-28
---

::post-title{:date="date"}
# Refresh System Environment Variables for IIS and Visual Studio
::

::notes
This is a repost from my old blog. First posted in 8/7/2019.
::

<br/>

Environment variables can sometimes be a pain to deal with. Since environment variables are often cached or loaded only once, a change might not be immediately reflected in the application that we intend to apply them to.

<br/>

 In my case, I need to debug our ASP.NET application and need the new environment variables. 

<br/>

Restarting the Visual Studio itself was not enough. 
I tried to kill the worker process and that doesn't help either. 
At the end, I tried one thing that works which I got from a forum, i.e., enter the following command on command prompt or PowerShell run in admin mode:

::code-block
```
iisreset
```
::