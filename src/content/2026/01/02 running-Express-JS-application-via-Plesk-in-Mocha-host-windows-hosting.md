---
date: 2026-01-02
---

::post-title{:date="date"}
# Running Express JS Application via Plesk in Mocha Host Windows Hosting
::

::notes
This is a repost from my old blog. First posted in 1/10/2021.
::

<br/>

Nowadays, to run an application balancing best practices and ease of use need tons number of different technology. That means documentations are scattered too.

<br/>

I have an Express JS application that I need to be hosted and since I have active plan under Mocha Host, I decided to host it there. My hosting server is Windows and it supports Node.JS. Looking into the settings, it is as simple as enabling Node.JS. However, after managing to deploy the application, it doesn't run as expected as it returns 404 for known url.

<br/>

When I finally managed to solve the running issue, there are many steps that I need to configure to get my application working.

**Step 1**

I'm using Express JS version 4 generated via express-generator, so the starting script is not app.js, but /bin/www. So following the instruction in the article below:

[https://www.plesk.com/blog/product-technology/node-js-plesk-onyx/]{.text-blue-600}

<br/>

I created a new entry file called service.js. The content is simple as follow:

::code-block
```
const app = require('./app');
const http = require('http');

http.createServer(app).listen(process.env.PORT);
```
::

**Step 2**

In Plesk under `Websites & Domains > YOUR_WEBSITE > Node.js > Application StartUp File`{.bg-gray-200 .p-2 .rounded}, change it from app.js to server.js.














Step 3

Ensure that Document Root and Application Root are the same. Unlike other hosting in which Document Root path = Application Root path + /public.

Step 4

Add the following into the web.config under <system.webserver> tag, so the Express routing works. 

<rewrite>
  <rules>
    <rule name="myapp">
      <match url="/*" />
      <action type="Rewrite" url="server.js" />
    </rule>
  </rules>
</rewrite>

The above is enough in my case. I don't have to add <handlers> and/or other suggested tags.

Step 5 (Optional)

In my case, I have to click the NPM install button in step 2 to install dependencies.

Also, you might need to restart the dedicated application pool or disable/enable Node.js. In my case, I didn't have to do that.

Other links that helped me figured this thing out:
https://www.a2hosting.co.id/kb/developer-corner/making-a-simple-node.js-application-in-plesk-for-windows
https://support.plesk.com/hc/en-us/articles/360010589619-Node-js-application-subpath-shows-error-404-after-being-deployed-in-Plesk
https://talk.plesk.com/threads/use-nodejs-and-problem-with-express-routing.343510/

