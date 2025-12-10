---
date: 2025-12-09
---

::post-title{:date="date"}
# IIS 401 Error on New Website
::

::notes
This is a repost from my old blog. First posted in 7/13/2020.
::

<br/>

I had a new site setup on IIS and thought I got everything setup fine. Everything seems ok from:

- Binding
- SNI
- Certificate
- Enable Allow Anonymous
- Directory permission
- Redirect
- etc

<br/>

Guess what? Can't even access my home page.

<br/>

The server throws the following error:

<br/>

::code-block
```
401 - Unauthorized: Access is denied due to invalid credentials.
You do not have permission to view this directory or page using the credentials that you supplied.
```
::

<br/>

Usually it is because of permission on the directory. But this time it looks fine. Weird thing is I can visit aspx page, but some of the static files are blocked.

<br/>

After some browsing, I noticed the value under `Site > Authentication > Anonymous Authentication > Edit... (right-click)`{.bg-gray-200 .p-2 .rounded} of the other site that works fine was set to Application pool identity. Meanwhile, my new site was set to Specific user: IUSR and my directory only allow access to IIS_IUSRS.

<br/>

In my case, setting the above to Application pool identity solves my issue.
