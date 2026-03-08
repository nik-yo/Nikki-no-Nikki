---
date: 2026-02-01
---

::post-title{:date="date"}
# Docker Build Error
::

::notes
This is a repost from my old blog. First posted in 3/20/2025.
::

<br/>

After many successful build, I happened to bump into the following error when trying to run docker build.

::code-block
```
=> ERROR [internal] booting buildkit
=> => pulling image moby/buildkit:buildx-stable-1

...

ERROR: Error response from daemon: {"message":"x509: certificate signed by unknown authority"}
```
::

<Br/>

The only thing changed on my machine was I installed and run podman, so I stop podman machine by running:

::code-block
```
podman machine stop
```
::

And docker build works again.