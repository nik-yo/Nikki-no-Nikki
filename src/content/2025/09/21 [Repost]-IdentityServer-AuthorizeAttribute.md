---
date: 2025-09-21
---

::post-title{:date="date"}
# IdentityServer AuthorizeAttribute
::

::notes
This is a repost from my old blog. First posted in 11/10/2016.
::

<br />

I attempted to use `ResourceAuthorize` attribute in my personal project which uses Thinktecture IdentityServer 3. When testing around, I suddenly realize not only ResourceAttribute is not working, the `AuthorizeAttribute` was broken as well. Spent hours testing and finally found out that it was caused by a slash ("/") at the end of my issuer.

So "https://www.test.com/" does not work, but "https://www.test.com" works somehow. The `AuthorizeAttribute` now works but at this time, I'm still checking why troubleshooting my `ResourceAttribute`.

Edit: Apparently my `ResourceAttribute` was not working because one of the scopes is invalid and my intended scope is after that which eventually was not processed. And the requested claims will be included in the access_token.