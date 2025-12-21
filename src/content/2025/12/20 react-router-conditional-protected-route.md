---
date: 2025-12-20
---

::post-title{:date="date"}
# React Router Conditional Protected Route
::

<br/>

I'm using `react-oidc-context`{.bg-gray-200 .p-2 .rounded} package for my app. And so far, all routes on my app is protected. However, I need to let some routes to not require authentication. I can't find much documentation on how to do that on React Router v7 Framework mode. So, I start with gathering all relevant information.

<br/>

To protect a route using react-oidc-context is by providing the component that we want to protect ([https://github.com/authts/react-oidc-context?tab=readme-ov-file#protect-a-route]{.text-blue-600}). 

<br/>

However, the Framework mode of React Router v7 route config is made up of strings, so I can't just do something like:

::code-block
```
route('/some-route', withAuthenticationRequired('path-to-file'))
```
::

<br/>

Back in React Router v6, since I was using either Data or Declarative mode, I can just create AuthenticationGuard component and apply it on the route itself similar to this (Auth0 guide)[https://developer.auth0.com/resources/guides/spa/react/basic-authentication#:~:text=the%20next%20section.-,Add%20Route%20Guards%20to%20React,-You%27ll%20create%20an]{.text-blue-600}. But obviously can't be applied to React Router v7 Framework mode.

<br/>

In my case, I want to protect a parent Layout component, so all the underlying routes will be protected as well. And I will put unprotected route outside of the protected Layout component. So, I went from:

::code-block
```
export default withAuthenticationRequired(Outlet, {
  OnRedirecting: () => (<div>Redirecting to the login page...</div>)
})
```
::

to

::code-block
```
export default withAuthenticationRequired(Layout, {
  OnRedirecting: () => (<div>Redirecting to the login page...</div>)
})
```
::

<br/>

The code above was in `root.tsx`{.bg-gray-200 .p-2 .rounded} and it didn't work for me.

<br/>

And as a good keeping-up-with-the-tech engineer, I check with AI. The recommended way was to use middleware. I'm familar with middleware concept on .NET OWIN era, so it makes sense to me. As I explore it at this time, the middleware is still under testing for Framework mode and it is an opt-in only. In other words, it probably will change in the future, so I'd rather wait until it stabilize a bit more.

<br/>

Eventually, after more trials and errors, I got it working by moving the withAuthenticationRequired method from `root.tsx file`{.bg-gray-200 .p-2 .rounded} to `Layout.tsx`{.bg-gray-200 .p-2 .rounded} file.

<br/>

My route looks like the following:

::code-block
```
export default [
  layout('./routes/layout.tsx', [
    route("protected", "./routes/protected.tsx")
  ]),
  route("unprotected", "./routes/unprotected.tsx")  
] satisfies RouteConfig;
```
::

<br/>

And my Layout.tsx:

::code-block
```
const Layout = () => {
...
}

export default withAuthenticationRequired(Layout, {
  OnRedirecting: () => (<div>Redirecting to the login page...</div>)
})
```
::
