---
date: 2025-12-11
---

::post-title{:date="date"}
# Checking Anonymous Authentication Allowed on ASP.NET OWIN Middleware and Web Forms
::

::notes
This is a repost from my old blog. First posted in 7/13/2020.
::

<br/>

Some business logic on our web application apparently caused issue when hitting a page that allow anonymous authentication. And it seems there is no simple flag that indicates whether a page requires authorization or not.

<br/>

I need to check for allow anonymous in ASP.NET Web Forms page and on OWIN middleware.

<br/>

For ASP.NET Web Forms page, I found the following thread in StackOverflow which works great:

[https://stackoverflow.com/questions/8662922/programmatically-check-if-page-requires-authentication-based-on-web-config-setti]{.text-blue-600}

<br/>

In my case, I need to convert the code to VB.NET, so it becomes:

::code-block
```
Dim principal = New GenericPrincipal(New GenericIdentity(String.Empty, String.Empty), New String() {})
Dim isAllowAnonymous = UrlAuthorizationModule.CheckUrlAccessForPrincipal(Page.AppRelativeVirtualPath, principal, Context.Request.HttpMethod).ToString()
```
::

<br/>

And on OWIN middleware, I need to tweak the above a little bit, so it becomes:

::code-block
```
Dim principal = New GenericPrincipal(New GenericIdentity(String.Empty, String.Empty), New String() {})
Dim isAllowAnonymous = UrlAuthorizationModule.CheckUrlAccessForPrincipal(context.Request.Uri.AbsolutePath, principal, context.Request.Method)
```
::