---
date: 2025-09-01
---

::post-title{:date="date"}
# ASP.NET Web Forms, Auth0 and OWIN
::

::notes
This is a repost from my old blog. First posted in 10/16/2019.
::

<br/>

Sometimes supporting an old technology is much more troublesome, but when you manage to overcome the challenge, you will be feeling so much more satisfied.

<br/>

My boss wants to use Auth0 for authentication, but the application that we need to modify is in ASP.NET Web Forms and there is no Auth0 quickstart for ASP.NET Web Forms and I can't find an example online.

<br/>

I remember I saw somewhere that we can use OWIN on ASP.NET Web Forms with a bit of tweaking. Following the awesome blog post below, I managed to get OWIN to work.

[https://tomasherceg.com/blog/post/modernizing-asp-net-web-forms-applications-part-2]{.text-blue-600}

Next, I followed Auth0 quickstart for ASP.NET (OWIN)

[https://auth0.com/docs/quickstart/webapp/aspnet-owin/01-login#configure-auth0]{.text-blue-600}

One thing to note, the RedirectUri specified in the app has to be registered in Callback URLs in the Auth0 account.

Then comes the customization. First, I need to be able to secure pages. Reading online, I found out that simply adding the following to web.config works great. Notice the authentication tag with mode set to None.

::code-block
```
    <system.web>
      <authorization>
        <deny users="?"/>
      </authorization>
      <authentication mode="None"/>
    </system.web>
```
::

Second, I need to capture the redirect. Based on the Auth0 quickstart, whenever a secure page is requested, it will redirect to [https://domain_name/Account/Login]{.text-blue-600}. For somewhat reason when I change this path under LoginPath in the quickstart, it doesn't change the redirection at all. So I decided to leave it as is.

Per my understanding, unless FriendUrls is enabled in ASP.NET Web Forms, /Account/Login won't work properly. That means I have to handle it manually. At a glance, my options are HTTP Module or OWIN Middleware. Since I already have OWIN installed, I wrote a custom OWIN Middleware.

[https://www.hanselman.com/blog/IntroducingASPNETFriendlyUrlsCleanerURLsEasierRoutingAndMobileViewsForASPNETWebForms.aspx]{.text-blue-600}

There are many ways in writing custom middleware, so I just picked one.

[https://benfoster.io/blog/how-to-write-owin-middleware-in-5-different-steps]{.text-blue-600}

On my middleware Invoke method, I have the following:

::code-block
```
public async override Task Invoke(IOwinContext context)
{
       if (context.Request.Uri.AbsolutePath.Equals("/Account/Login", StringComparison.OrdinalIgnoreCase))
       {
             string auth0RedirectUri = ConfigurationManager.AppSettings["auth0:RedirectUri"];
             context.Authentication.Challenge(new AuthenticationProperties
            {
                RedirectUri = auth0RedirectUri
            }, "Auth0");
        }
        else
        {
              await Next.Invoke(context);
         }
}
```
::

<br/>

Then I register my middleware after app.UseOpenIdConnectAuthentication() in Auth0 quickstart with code similar to the following:

::code-block
```
app.Use(typeof(CustomMiddleware));
```
::

And that's it. So far, it has been working well.