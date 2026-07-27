---
date: 2026-07-04
---

::post-title{:date="date"}
# Updating Config per Environment on React in S3
::

<br/>

I have been reading Continuous Delivery book by Jez Humble and David Farley. I really like the idea that to deploy an application, I just need to select a version and environment and hit Deploy button.

<br/>

So, I tried to update my current pipeline to be able to do that. It's not without challenge, especially for SPA hosted in S3.

<br/>

First of all, there's no concept of Environment Variables in S3. Alternatively, I can use .env, but it has to be done during build time which counter to the idea of adjusting the configuration per environment because my artifact will then tied whatever configuration I use on build time. And to deploy to different environment will then requires a different build which counter to keeping the artifact the same between environment.

<br/>

As I was checking online for solutions, one suggestion is to move to compute running Node.js which will then update the config before serving it to the user. But S3 is nice and cheap, so would like to stick with it.

<br/>

With the help of Claude, another suggestion is to create a config file static file. The application will then retrieve it, extract the content before running the application itself.

<br/>

This is not bad, but a bit strange. I'm also a bit worried on config file injection which when I think later, CORS will help mitigate that issue. Besides, being SPA to pull index.html, theoretically it can be hijacked too. And it is a solution indeed.

<br/>

This way, on my pipeline, I can update the value of the config file before deploying the application to any environment after the build stage.