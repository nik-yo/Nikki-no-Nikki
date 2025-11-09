---
date: 2025-10-05
---

::post-title{:date="date"}
# UNC and URL
::

::notes
This is a repost from my old blog. First posted in 10/10/2018.
::

<br/>

Found something weird today. For a long time, we have published our project to the test environment using the following UNC pattern: `\\testservername.productiondomain.com\shared-path`{.bg-gray-200 .p-2 .rounded}. However, when I did that today, it accidentally connected to production.

<br/>

Removing the domain as part of the UNC solves the problem. The weird thing is the same UNC points to our test environment when run on my coworker's computer. Nothing is weird on our hosts file. I have not figured out why this is so.