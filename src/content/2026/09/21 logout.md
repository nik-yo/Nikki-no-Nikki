---
date: 2026-09-21
---

::post-title{:date="date"}
# Logout
::

<br/>

The logout mechanism in my react app doesn't seem to work. Everytime I log out, it logs back in. The app uses AWS cognito with **react-oidc-context** and **oidc-client-ts** packages.

<br/>

As in today's norm, I went AI first and the first suggestion was the logout code is actually asynchronous, so it suggested turning the following:

::code-block
```
onclick={() => {
  auth.removeUser();
  signOutRedirect();
}}
```
::

to

::code-block
```
onclick={async () => {
  await auth.removeUser();
  signOutRedirect();
}}
```
::

<br/>

Well, those didn't work. And the second suggestion was changing the order because signOutRedirect() is supposed to clear the cookie which caused the automated login. By changing the order, the idea is we ensure the cookie is cleared, so it became:

::code-block
```
onclick={() => {
  signOutRedirect();
  auth.removeUser();
}}
```
::

<br/>

Eventually after manual trial and error, it was caused by requiring authentication to all endpoint and the redirectUri/callbackUri to be the same as logoutUri. Seems like after it is logged out, the app detects that the user is no longer authenticated and automatically send the user to the login screen. During the logout process, the cookie was not cleared fast enough and thus the user is logged back in.

<br/>

So, the solution in my case is to have different values for redirectUri and logoutUri:

- RedirectUri: http://localhost:3000
- LogoutUri: http://localhost:3000/logout



