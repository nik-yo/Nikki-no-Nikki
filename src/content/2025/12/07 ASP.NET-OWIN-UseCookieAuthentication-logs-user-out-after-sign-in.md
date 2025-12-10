---
date: 2025-12-07
---

::post-title{:date="date"}
# ASP.NET OWIN UseCookieAuthentication Logs User Out After Sign In
::

::notes
This is a repost from my old blog. First posted in 6/29/2020.
::

<br/>

I have a need to do manual cookie authentication. As I use OWIN with UseCookieAuthentication middleware, it is not that hard except when I had no idea what is actually required.

<br/>

I know I had to create a ClaimsIdentity and I will need AuthenticationProperties object. Supplying both of them successfully created the cookie, but when I went to a different page, the authentication failed and the application kicked me out to the login page. The following is my initial problematic code in the authentication handler:

::code-block
```
Dim claims As New List(Of Claim)
claims.Add(New Claim(ClaimTypes.NameIdentifier, user.Username))
Dim claimsIdentity As New ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationType)
context.GetOwinContext().Authentication.SignIn(New AuthenticationProperties With {
    .ExpiresUtc = expiration
}, claimsIdentity)
```
::

<br/>

For my basic requirement, apparently there are required claims. In my case, I'm missing the Name claim. Adding the following claim solves my issue:

::code-block
```
claims.Add(New Claim(ClaimTypes.Name, user.Name))
```
::

As of now, I'm still not sure why it is necessary and haven't had time to look it up. But a quick read on ClaimsIdentity reveal that NameClaimType is necessary.

[https://docs.microsoft.com/en-us/dotnet/api/system.security.claims.claimsidentity?view=netframework-4.8]{.text-blue-600}

My final code thus becomes:

::code-block
```
Dim claims As New List(Of Claim)
claims.Add(New Claim(ClaimTypes.NameIdentifier, user.Username))
claims.Add(New Claim(ClaimTypes.Name, user.Name))
Dim claimsIdentity As New ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationType)
context.GetOwinContext().Authentication.SignIn(New AuthenticationProperties With {
    .ExpiresUtc = expiration
}, claimsIdentity)
```
::



