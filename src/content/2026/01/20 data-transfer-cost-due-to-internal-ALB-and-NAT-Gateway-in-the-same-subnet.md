---
date: 2026-01-20
---

::post-title{:date="date"}
# Data Transfer Cost due to Internal ALB and NAT Gateway in the Same Subnet
::

::notes
This is a repost from my old blog. First posted in 8/29/2024.
::

<br/>

This is what I heard from my junior after he moved to a different company. They found an issue with data transfer cost due to internal ALB and NAT Gateway in the same subnet. Apparently, the internal application sends data to the ALB and it's being processed by the NAT gateway as well. I'm not exactly sure how it works, but it was a bad networking. They removed the NAT gateway and just let the ALB managed the traffic and save cost. 

