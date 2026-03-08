---
date: 2026-01-29
---

::post-title{:date="date"}
# JWT is not well formed in ASP.NET Web API JwtBearer .NET 8
::

::notes
This is a repost from my old blog. First posted in 9/25/2024.
::

<br/>

It never caused a problem for me to implement JwtBearer token validator, but this time it is really take my time to troubleshoot what's going on. Long story short, there's a breaking change going to .NET 8 and on top of that, the default package version doesn't solve the issue.

<br/>

Here's how I implement my service:

::code-block
```
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => ...removed for brevity);
services.AddAuthorization();

...

app.UseAuthentication();
app.UseAuthorization();
```
::

<br/>

But checking the bearer token, it was a completely valid token. I retrieved the token using a quick custom middleware.

::code-block
```
app.Use(async (context, next) =>
{
    await next.Invoke();
    Debug.WriteLine(context.Request.Headers.Authorization);
});

app.UseAuthentication();

...
```
::

<br/>

Then I validate the token in [https://jwt.io]{.text-blue-600}.

<br/>

The error that I received contains:

::code-block
```
IDX14100: JWT is not well formed, there are no dots (.). The token needs to be in JWS or JWE Compact Serialization Format.
```
::

<br/>

On top of that, the browser response header has the following header:

::code-block
```
WWW-Authenticate: Bearer error="invalid_token"
```
::

Searching online, the most helpful hint is probably this thread: [https://github.com/dotnet/aspnetcore/issues/52075]{.text-blue-600}

<br/>

There are some suggestions in there, but the one that finally solves my problem is the fact that the following package version doesn't work:

::code-block
```
Microsoft.IdentityModel.Protocols.OpenIdConnect 7.1.2
```
::

<br/>

It was a transitive package and I have to upgrade it by installing the latest version, as of this time 8.1.0.

<br/>

And that fixed my issue without any code change.






