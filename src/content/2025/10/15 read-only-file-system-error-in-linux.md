---
date: 2025-10-15
---

::post-title{:date="date"}
# Read-only File System Error in Linux
::

::notes
This is a repost from my old blog. First posted in 2/8/2019.
::

<br/>

I was moving the content of CentOS boot drive to a new hard drive. CentOS has MBR partition with xfs file system. It worked great, boot fine, but when I tried to do yum install, it barked that it can't do the install because the file system is read-only.

<br/>

After a decent amount of research, I found out that the problem lies on the `/etc/fstab`{.bg-gray-200 .p-2 .rounded}. Because it is new hard drive, the UUID is different and grub2-mkconfig used the new UUID to configure the grub.cfg. However, when it is booted, it checked the /etc/fstab and found the discrepancy. Once I changed the /etc/fstab to reflect the new UUID, the error went away.