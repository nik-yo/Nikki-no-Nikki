---
date: 2026-02-02
---

::post-title{:date="date"}
# TimeZoneInfo and Alpine
::

I was helping a co-worker fixing a `TimeZoneNotFoundException`{.bg-gray-200 .p-2 .rounded} error. The error was actually on `TimeZoneInfo.FindSystemTimeZoneById()`{.bg-gray-200 .p-2 .rounded}. Per my experience, it was based on timezone installed in the machine. I was told that using Windows or Linux Id both throw an exception.

<br/>

I found out that the application Docker base image is based on Alpine Linux. A quick search reveals that Alpine Linux doesn't have tzdata package installed.

<br/>

Added the following line in the Dockerfile fixed the error.

::code-block
```
RUN apk add --no-cache tzdata
```
::