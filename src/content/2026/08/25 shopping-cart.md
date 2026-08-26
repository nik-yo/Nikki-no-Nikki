---
date: 2026-08-25
---

::post-title{:date="date"}
# Shopping Cart
::

<br/>

I was working on a shopping cart and find it fascinating blend of simplicity and complexity. Kudos to those who get it correctly without using third party library. Basically, I have a product site which is in a per tenant subdomain and but checkout page in a different domain. The reason for this architecture is I want to allow login at checkout page.

<br/>

Let's cover login first. Since it will be per tenant, the subdomain is dynamic, so let say the product page is hosted in **https://shop123.example.com**. Since I'm using OpenID, to allow login, the url has to be registered as a callback url. That also means every dynamic url has be registered which will easily go over the limit imposed by my auth provider. One solution is to use a single domain for callback url/redirect url, let say **https://example.com**. However, specifying **https://example.com** while I'm in **https://shop123.example.com** doesn't work, the originating domain has to be the same as the redirect url domain.

<br/>

Another thing is I want the ability to allow anonymous user to add product to the cart. Suggestion is to keep an identifier on product page, but keep track of the product on the server side. However, passing the identifier between domains securely is not straightforward. Passing through query string is not suggested even if the identifier is not easily guessed. So, I had to rely on cookie.

<br/>

One interesting thing when I tried to test locally is localhost, http and custom domain. First, I tried to create a subdomain over localhost, say **http://shop123.localhost**. Well, it works for the browser and, in my case, vite. However, it doesn't work for cookie since localhost is not a real domain, the cookie is dropped silently.

<br/>

Next attempt is to use custom domain, say **http://shop123.example.local**. Browser navigation checked (with hosts file entry), vite checked, and cookie checked. However, my auth provider says no to **http** on a domain. Only localhost can use http, the rest use https. Fortunately, vite comes with dev cert, so I can use **https://shop123.example.local** and **https://example.local** instead.

<br/>

So, it finally works as expected and I got to learn new things.