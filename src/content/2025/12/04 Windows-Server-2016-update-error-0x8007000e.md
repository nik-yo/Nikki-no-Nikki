---
date: 2025-12-04
---

::post-title{:date="date"}
# Windows Server 2016 Update Error 0x8007000e
::

::notes
This is a repost from my old blog. First posted in 6/24/2020.
::

<br/>

This one server that I managed has not been updated for a while and I happened to need to create a new image out of it, so I thought I might as well update it to the latest via Windows Update. And I ended up spending hours troubleshooting how to update.

::code-block
```
Windows Update ran into 0x8007000e error when checking for updates.
```
::

<br/>

Searching online, some suggested installing Windows Update Troubleshooter or similar tools or update the Windows Update agent. And some people suggested that the OS actually runs out of memory or storage. 

<br/>

My server has 10+ GB of free space and 2GB memory. I thought it shouldn't run out of resources until I read the following articles:

[https://feedback.azure.com/forums/216843-virtual-machines/suggestions/31407055-low-on-memory-error-server-2016-b-series]{.text-blue-600}

<br/>

I follow the suggestion in there to increase the memory to 4GB and it finally updates without issue. I also noticed while the check is running, it consumes about 45% of memory. And the download finally runs, it takes around 55-65% of memory. That definitely won't work on my previous configuration. So the solution in my case is to use 4GB or more memory.


