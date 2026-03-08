---
date: 2026-02-05
---

::post-title{:date="date"}
# Interrupted System Call in Docker Build
::

When I build Docker image locally on my machine, it throws Interrupted System Call error intermittently. The issue is on command similar to the following:

::code-block
```
RUN wget https://example.com/somefile.ext -P /some/local/directory/ && \
    cat /some/local/directory/somefile.ext >> /some/other/directory/targetfile.ext
```
::

<br/>

I tried many different command and none worked until I read the documentation on wget where it says that wget runs in the background. Apparently, wget hadn't finished downloading the file when `cat`{.bg-gray-200 .p-2 .rounded} ran. When I added a small delay, it works consistently in my local.

::code-block
```
RUN wget https://example.com/somefile.ext -P /some/local/directory/ && \
    sleep 2 && \
    cat /some/local/directory/somefile.ext >> /some/other/directory/targetfile.ext
```
::
