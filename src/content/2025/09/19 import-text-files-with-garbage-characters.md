---
date: 2025-09-19
---

::post-title{:date="date"}
# Import Text Files with Garbage Characters
::

::notes
This is a repost from my old blog. First posted in 10/21/2016.
::

<br />

I had a case in which we use VB.NET to import a text file and it didn't work properly. My code at first was:

::code-block
```
Dim someString As String = Encoding.ASCII.GetString(someByteArray)
```
::

After researching for a while, I found out that the text file is encoded using UTF-8. Thus, switching it to the following code make it work properly:

::code-block
```
Dim someString As String = Encoding.UTF8.GetString(someByteArray)
```
::

Encoding matters!