---
date: 2025-09-24
---

::post-title{:date="date"}
# Path.Combine and Path.GetFullPath
::

::notes
This is a repost from my old blog. First posted in 5/5/2017.
::

<br/>

I bumped into a case in which I need to resolve a relative path to a file, but the problem is it doesn't resolve as expected when Path.GetFullPath is used.

<br/>

For example:

::code-block
```
path1 = "C:\file\"
path2 = "..\test.txt"
```
::

<br/>

`Path.Combine`{.bg-gray-200 .p-2 .rounded} produces "C:\file\..\test.txt"

<br/>

`Path.GetFullPath((New Uri(Path.Combine(path1,path2))).LocalPath)`{.bg-gray-200 .p-2 .rounded} produces "C:\test.txt" which is correct.

<br/>

The problem starts when I realized another slash was accidentally appended to the end of path1.

::code-block
```
path1 = "C:\file\"
path2 = "..\test.txt"
```
::

<br/>

`Path.Combine`{.bg-gray-200 .p-2 .rounded} produces "C:\file\\..\test.txt"

<br/>

`Path.GetFullPath((New Uri(Path.Combine(path1,path2))).LocalPath)`{.bg-gray-200 .p-2 .rounded} produces "C:\file\test.txt" which is correct but unexpected.
