---
date: 2026-05-25
---

::post-title{:date="date"}
# Linux Mint Error Creating Bootable USB
::

I used balenaEtcher on Windows 11. The error message that I got is:

::code-block
```
Error:(0 , h.requestMetadata) is not a function.
```
::

<br/>

After reading posts online, I got it to work by running balenaEtcher as administrator. Basically, just right click and select **Run as administrator** and I no longer encounter the error. Etcher version that I used is 2.1.6.0.

