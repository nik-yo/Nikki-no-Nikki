---
date: 2026-01-18
---

::post-title{:date="date"}
# Cython Compile Error on Python 3.12 on Windows 10
::

::notes
This is a repost from my old blog. First posted in 8/22/2024.
::

<br/>

I have Python 3.12 installed on my Windows 10 machine. I tried to install a package using Pip. Apparently, the package contains Cython and needs to be compiled. However, the compilation failed with the following message:

::code-block
```
Cannot open include file: 'io.h': No such file or directory
```
::

Ok, not a problem, I just go to Visual Studio Installer and install Desktop development with C++ package.

<br/>

That fixed the first issue. But installing the package still failed. This time the error message is:

::code-block
```
'C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\VC\\Tools\\MSVC\\14.41.34120\\bin\\HostX86\\x64\\cl.exe' failed with exit code 2
```
::

To fix the above, I had to downgrade python to 3.10 and the package is installed properly.