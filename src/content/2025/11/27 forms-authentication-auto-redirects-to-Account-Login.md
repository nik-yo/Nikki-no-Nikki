---
date: 2025-11-27
---

::post-title{:date="date"}
# Forms Authentication Auto Redirects to /Account/Login
::

::notes
This is a repost from my old blog. First posted in 5/7/2020.
::

<br/>

We are required to add a different authentication method on our ASP.NET Web Forms app. It is currently configured to use OWIN, so I thought I can just disable the current authentication method and revert to the old web.config forms authentication for testing purposes. Turns out it is harder than I thought.

<br/>

After disabling the current authentication method, I add the common Forms Authentication web.config entry:

::code-block
```
<authorization>
   <deny users ="?" />
   <allow users = "*" />
</authorization>
<authentication mode="Forms">
   <forms name=".ASPXFORMSAUTH" loginUrl="~/login.aspx" protection="All" path="/" timeout="30" />
</authentication>
```
::

Then I try to access the protected page and to my surprise I got redirected to `/Account/Login?ReturnUrl=`{.bg-gray-200 .p-2 .rounded}. That is weird and I verified other settings and none seems to be out of place. 

<br/>

Searching online, I happened to find the following thread: 

[https://forums.asp.net/t/1847413.aspx?How+is+authentication+mapped+to+Account+Login]{.text-blue-600}

<br/>

Following the instruction, I added the following under `<appSettings>`{.bg-gray-200 .p-2 .rounded} tag in web.config and it redirects properly.

::code-block
```
<add key="loginUrl" value="~/login.aspx" />
```
::

<br/>

Update
5/8/2020
According to the following article, there is a way to disable the redirect instead of changing the destination.

[https://docs.microsoft.com/en-us/aspnet/whitepapers/mvc3-release-notes#0.1__Toc274034230]{.text-blue-600}

<br/>

To disable the auto redirect, add the following under <appSettings> tag in web.config:

::code-block
```
<add key="enableSimpleMembership" value="false" />
<add key="autoFormsAuthentication" value="false" />
```
::
