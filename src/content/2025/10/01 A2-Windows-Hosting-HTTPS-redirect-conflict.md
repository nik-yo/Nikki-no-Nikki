---
date: 2025-10-01
---

::post-title{:date="date"}
# A2 Windows Hosting HTTPS Redirect Conflict
::

::notes
This is a repost from my old blog. First posted in 9/8/2018.
::

<br/>

With the intention of following best practice, I tried to enforce HTTPS on my websites hosted in A2 Hosting. Under Hosting Settings > Security, I found a check box that says "Permanent SEO-safe 301 redirect from HTTP to HTTPS", it sounds like the right one as it will redirect any HTTP to HTTPS. Because it is a windows server, it also has IIS Settings. And I found "Require SSL/TLS" check box under IIS Settings > Directory Security Settings. That sounds different from permanent redirect, so I check it as well.

<br/>

When I test the settings by visiting my website using regular HTTP, I received a 403 error. My first attempt to fix the issue was going back to the IIS Settings and set the Authentication from Windows to None. However  that doesn't work. After several trial and error, I have to uncheck the "Require SSL/TLS" check box under IIS Settings > Directory Security Settings to redirect the traffic correctly.