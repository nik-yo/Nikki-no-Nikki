---
date: 2025-10-09
---

::post-title{:date="date"}
# Supressing Output in PowerShell
::

::notes
This is a repost from my old blog. First posted in 11/1/2018.
::

<br />

I was working with DiskPart, PowerShell, and Amazon SSM. Whenever I run DiskPart from PowerShell, the output was reflected in the console and it was recorded as Amazon SSM run command output, thus my run command was not completely clean. Such as the following:

::code-block
```
Microsoft DiskPart version 6.3.9600
Copyright (C) 1999-2013 Microsoft Corporation.
On computer: MyComputer
DISKPART>
Disk 1 is now the selected disk.
DISKPART>
DiskPart successfully converted the selected disk to dynamic format.
```
::

Reading Q&A and documentation online, seems like no straightforward way to suppress output from DiskPart. I then tested something, how about if I assign the output to a variable and ignore it. It works and the command is still executed. For example, listing volume will be like the following in PowerShell:

::code-block
```
$DiskPartOutput = 'list volume' | diskpart
```
::