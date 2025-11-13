---
date: 2025-11-03
---

::post-title{:date="date"}
# Kernel not Updated on Ubuntu 14.04 in AWS EC2 Nitro-based Instance
::

::notes
This is a repost from my old blog. First posted in 11/13/2019.
::

<br/>

Sometimes a simple thing which works for many others doesn't work for us and this time it is on updating the Linux kernel.

<br/>

It is all started when we are trying to migrate an m1 to t3. We are aware that t3 is a Nitro-based instance thus NVMe and ENA module have to be installed. Even after following AWS documentation, the modules don't seem to be installed properly even after reboot. Then the journey begins.

<br/>

First, I ran the following command to check what kernel is actually loaded:

::code-block
```
uname -r
```
::

<br/>

In this particular case, it returns: 3.13.0-45-generic. And I know that it is not the latest. So, as suggested by Amazon support, I ran the following commands one by one to see if the latest linux-aws package are properly installed and at the latest and nvme driver is loaded into the kernel (NVME driver is set to 'Y') 

::code-block
```
sudo apt-cache policy linux-aws

ls -al /boot/

cat /boot/config-4.4.0-1044-aws |grep -i "nvme"
```
::

And the result are all as expected. The latest kernel is installed and nvme driver is loaded, but somehow the latest kernel is not used. I ran the following command to confirm.

::code-block
```
dpkg -l | grep 'linux-image-'
```
::

<br/>

On the amazon kernel, it starts with ii so it is indeed properly installed. Searching more online, some people manage to get the latest kernel installed and loaded using a combination of the following commands:

::code-block
```
sudo apt-get update (update packages)

sudo apt-get install linux-generic (install meta package which was missing from my instance)

sudo apt-get install --reinstall linux-image-4.4.0-1044-aws (replace the last part with the latest kernel to reinstall)

sudo apt-get autoremove (clean up)

sudo apt-get install -f (force install missing packages)

update-grub (update grub)
```
::

<br/>

None seems to work for me. After several days, I was wondering if somehow it has something to do with grub. So I start checking the result of the update-grub command and found out that it tries to update /boot/grub/menu.lst. That means it is using grub-legacy. So, I ran the command to check for the content menu.lst:

::code-block
```
cat /boot/grub/menu.lst
```
::

To my surprise, none of the latest kernels are actually configured in there. In other words, the menu.lst is not updated properly. Few more online search brought me to the following article [https://ubuntuforums.org/showthread.php?t=873448]{.text-blue-600}. Seems like there is a case which will trigger a bug. Hence menu.lst is not updated. So I make a quick copy and re-run update-grub.

::code-block
```
cp /boot/grub/menu.lst /boot/grub/menu.lst.bak
rm /boot/grub/menu.lst
update-grub
```
::

And checking the menu.lst once again results in the latest kernel being updated in there. Restarting the instance and voilà! The latest kernel is loaded and converting it to t3 was successful.




