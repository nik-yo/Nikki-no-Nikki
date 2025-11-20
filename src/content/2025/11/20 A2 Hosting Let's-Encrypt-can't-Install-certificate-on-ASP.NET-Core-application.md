---
date: 2025-11-20
---

::post-title{:date="date"}
# A2 Hosting Let's Encrypt Can't Install Certificate on ASP.NET Core Application
::

::notes
This is a repost from my old blog. First posted in 3/11/2020.
::

<br/>

I have an ASP.NET Core app hosted by A2 Hosting. A2 Hosting provides free SSL certificate through Let's Encrypt, so I decided to install it for my application.

<br/>

Since the portal is by Plesk, I follow the guide in [https://support.plesk.com/hc/en-us/articles/115000165013]{.text-blue-600}

<br/>

However, it didn't work as expected. My application still has a web.config file. After trying different ways, I commented out aspNetCore module in the web.config and then the certificate was installed successfully. 

<br/>

By commenting the module, ASP.NET Core processing by IIS is disabled, so the validation request by Let's Encrypt is treated like a regular request towards a static file.
