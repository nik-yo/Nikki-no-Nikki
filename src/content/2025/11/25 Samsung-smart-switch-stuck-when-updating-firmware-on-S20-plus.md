---
date: 2025-11-25
---

::post-title{:date="date"}
# Samsung Smart Switch Stuck When Updating Firmware on S20+
::

::notes
This is a repost from my old blog. First posted in 4/6/2020.
::

<br/>

My old phone is dying so I got an S20+. The data transfer from old phone is easy, thanks to Samsung Smart Switch. However, even though the phone notified there was an OTA update, it can't download the update. While searching online for solution, I found out that Smart Switch PC can apply the update, so I give that a try.

<br/>

Smart Switch recommends using Samsung original cable, so I use the USB-C to USB-C cable that comes with the S20+. It works well to a point, phone was detected, firmware downloaded, but in my case, it is stuck at 86% for hours. Some people in the forum said, it can take up to 30 minutes. So, this is not normal.

<br/>

During the update, there is an option to cancel by pressing Volume down and Power key. However, that soft-brick the phone and I have to do Emergency Recovery. If you are also at this point, do jot down the "recovery code". I try the Emergency Recovery only to find out, it is also stuck at 86%. I tried two more times with the same result. Not good.

<br/>

One option in the online forum is using Odin to flash. So, just in case I need it, I downloaded the latest version suggested in SamMobile. It is the 3.14.4. However, some people say that is not a clean version. And some people reported flashing S20s successfully with 3.13.1 patched version. I also downloaded the firmware which happened to be 5GB just in case I really need Odin. Needless to say, I'm not very fond of using non-recommended tools as my phone was just a day old.

<br/>

At this point, Smart Switch can still detect the phone, so there is hope. I happened to read that one person in the online forum says he doesn't trust USB-C to USB-C cable due to its driver. That made me think of another option, how about if I switch the cable to USB-C to USB-A? Since USB-A has been around longer, the driver is more mature/time-tested. So, I ran Smart Switch again, not hoping much, but to my surprise, it passed the 86% mark and ended up flashing the firmware successfully. My phone is back! Praise God! Hallelujah!

<br/>

So, try using USB-C to USB-A cable.