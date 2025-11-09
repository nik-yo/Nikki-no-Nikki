---
date: 2025-10-07
---

::post-title{:date="date"}
# PowerShell Split String by Whitespaces or Multiple Spaces Using Regex
::

::notes
This is a repost from my old blog. First posted in 10/25/2018.
::

<br/>

I was looking into a way to split string that can take regular expression in PowerShell. Surprisingly, they have the capability:

::code-block
```
$StringArray = $StringInput -split '\s+'
```
::