---
date: 2026-01-15
---

::post-title{:date="date"}
# Cheap Way to Receive Email on Custom Domain
::

::notes
This is a repost from my old blog. First posted in 8/15/2024.
::

<br/>

I was looking for a budget friendly way to receive email on my custom domain. So, let say, I own example.com and I want to receive email on receive@example.com. 

<br/>

As I did my research, I found various way on doing it:

1. **Just forward it**. My domain name vendor apparently comes with free email forwarder, so I forward it to my non-custom domain email such as gmail.
2. **Just forward it (DIY)**. This is also a very cheap alternative and low cost. One way is to forward it through AWS SES. One such project is: https://github.com/arithmetric/aws-lambda-ses-forwarder
3. **Receive it through hosting**. I thought about this especially when I already paid for hosting service, usually it comes with mail server for free.

<br/>

Of course, we can always subscribe to some email service, but it will cost more but it has more features too.