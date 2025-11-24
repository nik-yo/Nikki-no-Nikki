---
date: 2025-11-24
---

::post-title{:date="date"}
# IdentityServer4 Custom Claims and Services
::

::notes
This is a repost from my old blog. First posted in 3/28/2020.
::

<br/>

It is all started from my intention to add "iat" claim to access token. IssuedAt (iat) claim is optional so it takes a bit of searching to figure out how to do that. Add that to my unfamiliarity with IdentityServer4, it becomes quite a task. At this point, I am using IdentityServer4 version 3.0.2.0.

<br/>

First, I found out that you might be able to add custom claim by extending `IProfileService`{.bg-gray-200 .p-2 .rounded}. It works well for some random claim, but not "iat". Strange, it must be filtered somewhere then.

<br/>

Then browsing the source code in github, I found out that it was indeed filtered by FilterProtocolClaims method in DefaultClaimService:

[https://github.com/IdentityServer/IdentityServer4/blob/master/src/IdentityServer4/src/Services/Default/DefaultClaimsService.cs]{.text-blue-600}

<br/>

Ok, so I think I can extend DefaultClaimsService. I tried by adding a custom class in the StartUp using the following code:

::code-block
```
services.AddTransient<IClaimsService,CustomClaimsService>();
```
::

Sadly, it didn't work. 

<br/>

I then learn that you can add the service under builder.Services, so I tried the following:

::code-block
```
services.AddIdentityServer()
      .... (removed for brevity)
      .Services.AddTransient<IClaimsService, CustomClaimsService>();
```
::

That works! My "iat" claim is included in the access token. In my case, I choose to overwrite GetStandardSubjectClaims method because that is where "auth_time" claim is set and "iat" claim has the same value as "auth_time" claim using code like the following:

::code-block
```
var authTime = claims.FirstOrDefault(c => c.Type == JwtClaimTypes.AuthenticationTime);
if (authTime != null)
{
   outputClaims.Add(new Claim(JwtClaimTypes.IssuedAt, authTime.Value, ClaimValueTypes.Integer));
}
```
::