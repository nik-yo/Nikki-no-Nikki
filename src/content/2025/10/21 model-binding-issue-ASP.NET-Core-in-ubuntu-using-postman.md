---
date: 2025-10-21
---

::post-title{:date="date"}
# Model Binding Issue ASP.NET Core in Ubuntu using Postman
::

::notes
This is a repost from my old blog. First posted in 4/5/2019.
::

<br/>

I spent a fair amount of time trying to troubleshoot my ASP.NET Core web server in Ubuntu. The issue starts when I noticed a failed model binding in Ubuntu using HTTP PUT method when it works locally on my Window machine. I also found out that it binds properly when I used HTTPS compared to HTTP.

<br/>

Looking into the server, I have configured Nginx as reverse proxy server which send a 301 Redirect to HTTPS when the request is made using HTTP. I can't find any issue on the web application itself, Nginx, so I decided to check Postman which I used to generate the request.

<br/>

I found out that by default, Postman always follows redirect. There is nothing wrong with that, except seems like the data is lost during redirect. Eventually I found out that, 301 is meant to be used with GET and thus any POST/PUT data will be scrapped during redirect. Hence, it is the correct logic all along.