---
date: 2026-07-05
---

::post-title{:date="date"}
# Docker from Scratch
::

<br/>

Today, I'm wondering how did all those base Docker image created. And what happened on the most basic layer of a Docker image.

<br/>

I found out that there's a reserved image called scratch. So, the most basic docker image can be derived from it by adding `FROM scratch`{.bg-gray-200 .p-2 .rounded} layer.

<br/>

At the most basic form, it actually runs a Linux kernel, no matter what is the host environment is. Yes, even on Windows.

<br/>

From scratch image, then we can add layers to reach the state of base image that we usually use.

<br/>

Link: [https://hub.docker.com/_/scratch]{.text-blue-600}