---
date: 2025-12-03
---

::post-title{:date="date"}
# ASP.NET Web Forms "External component has thrown an exception" Error
::

::notes
This is a repost from my old blog. First posted in 6/22/2020.
::

<br/>

Every once in a while, I will get a random error for reasons too time consuming to dig. I have been using Azure DevOps to create CI/CD pipeline to deploy our web application and it has been going well so far. And today, I suddenly got a weird error but it was easily solved.

<br/>

I had no trouble logging in and going to the main page of our web application. But when visiting a particular page, suddenly throws "External component has thrown an exception". I tested it locally and had no problem. And nothing changed on the code of that particular page. Sometimes it can be due to the server runs out of memory and that doesn't appear to be the case this time.

<br/>

This is probably another hiccup I thought. So, I went inside the server and recycle the application pool in IIS. Then, I went back to the browser and reload the page that caused an error and this time it loads without any issue. And the solution this time is simply recycling the application pool.