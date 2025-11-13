---
date: 2025-11-04
---

::post-title{:date="date"}
# Convert FAT32 to NTFS with No Data Loss in Windows
::

::notes
This is a repost from my old blog. First posted in 11/14/2019.
::

<br/>

Filesystem is as usual a pretty complicated thing. And I happened to have a new external hard drive that for somewhat reason was formatted as FAT32. Of course, I didn't notice until I put a bunch of data in it. 

<br/>

The time has come when I need to store file larger than the 4GB limit of FAT32. 

<br/>

So browsing around the internet, I found out that I can convert to NTFS without data loss and third party software from [https://www.tenforums.com/tutorials/85893-convert-fat32-ntfs-without-data-loss-windows.html]{.text-blue-600}.

<br/>

The steps that I took are:

<br/>

1. Make sure data are backed up somewhere else.
2. Close all software/application that has the drive opened. I closed the File Explore too.
3. Run command prompt as administrator.
4. Run the following command in command prompt: `convert <drive> /fs:ntfs`{.bg-gray-200 .p-2 .rounded}. For example: `convert D: /fs:ntfs`{.bg-gray-200 .p-2 .rounded}
5. Restart the computer.

<br/>

That's it!


