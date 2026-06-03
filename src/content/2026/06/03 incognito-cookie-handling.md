---
date: 2026-06-03
---

::post-title{:date="date"}
# Incognito Cookie Handling
::

<br/>

I tried to understand a weird case at work. Basically, I visit a page which will load exam page in an iframe inside an MFE component. However, it works in regular window, but not in incognito. We know that it is cookie based and we are using Chromium based browsers.

<br/>

So, I asked AI few questions and I figured out that incognito/private window will block third party cookie while regular window will allow third party cookie. And in my case, the iframe is loaded from a completely different domain and thus it is considered third party.

<br/>

For example, if the current domain is example.com and the server set cookie for example.com, the cookie is considered first party cookie.

<br/>

If the current domain is example.com and the server set cookie for something-else.com, then the cookie is considered third party. In incognito, the server that serves something-else.com will not receive the cookie.
