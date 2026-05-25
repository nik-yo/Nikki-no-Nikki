---
date: 2026-05-25
---

::post-title{:date="date"}
# Broadcom BCM4360 Driver on Ubuntu 26 for Macbook Pro 2014 Offline
::

<br/>

I managed to install Ubuntu 26 on my Macbook Pro 2014 using balenaEtcher: [https://documentation.ubuntu.com/desktop/en/latest/how-to/create-a-bootable-usb-stick/#using-balenaetcher]{.text-blue-600}.

<br/>

However, the wifi is not working. Turns out the adapter is by Broadcom and the driver is not included by default. Even after I opt for third party software installation.

<br/>

Running: `lspci -vvnn | grep Network`{.bg-gray-200 .p-2 .rounded} shows that my adapter is **Broadcom BCM4360 (rev 03)**.

<br/>

Since the laptop can't connect to wifi and I don't have ethernet cable, I used a different laptop to find the driver package which lands me on: [https://help.ubuntu.com/community/WifiDocs/Driver/bcm43xx]{.text-blue-600}

<br/>

My first try, which doesn't work, is to download the .deb packages in a usb drive and plug the drive to the Macbook. In my case, I know I need the sta driver, so I download the dkms from [https://launchpad.net/ubuntu/+source/broadcom-sta]{.text-blue-600}

<br/>

Then I run the following:
- `cd /run/media/<username>/<usbdrive-name>`{.bg-gray-200 .p-2 .rounded}. In my case, **cd '/run/media/nikki/USB DRIVE'**
- `sudo apt install ./<driver-filename>`{.bg-gray-200 .p-2 .rounded}

<br/>

The installer failed because dependencies are not installed. I found out that you can download the dependencies at [https://packages.ubuntu.com/]{.bg-gray-200 .p-2 .rounded}. Soon, it gets tedious due to the number of dependencies.

<br/>

I was like how about if I used a different way. An obvious option is ethernet cable + usb ethernet adapter, but I have none of that. So, I ended up using my Android phone + USB cable and enabled USB tethering. This works! Basically using my phone as wifi adapter.

<br/>

After that, I simply use the Software Updater in Ubuntu to download required packages, restart and wifi works.

<br/>

Another option that I didn't have chance to try is BTPAN (Bluetooth Personal Area Network) to connect my Macbook to my Android phone and enable Bluetooth Tethering.


