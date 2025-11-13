---
date: 2025-09-01
---

::post-title{:date="date"}
# Where is My Environment Variables? Journey to Linux Service
::

::notes
This is a repost from my old blog. First posted in 3/29/2019.
::

<br/>

Ok, I had a .NET Core Web App running in Ubuntu behind Nginx. Everything else is fine except I can't retrieve the value of the environment variables that I put in /etc/environment.

<br/>

After hours of googling, turns out systemd service strips all out except some variables. Two ways to fix this:

1. Put the environment variable in the .service config file

::code-block
```
[Service]
Environment=MY_ENV_VAR=thevalue
```
::

2. Include /etc/environment in the service. (I don't think this is a good idea, especially for my use case).

::code-block
```
[Service]
EnvironmentFile=/etc/environment
```
::