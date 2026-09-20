---
date: 2026-09-01
---

::post-title{:date="date"}
# WIP in Software Development
::

<br/>

In the last few days, we managed to get our client to discuss about WIP, thanks to my team member. I drafted the message and our client thought it is a good idea to start the discussion.

<br/>

Our company uses Kanban and pair programming and thus WIP is encouraged. I have personally see the benefit of it in my previous team. Also I have read a few books that help:
- The Goal
- Toyota Kata
- The Phoenix Project
- Continuous Delivery

<br/>

Now, I'm in a new team and we have also 3 times the number of tickets in flight. At a glance, it looks productive, but in reality, many of those tickets have been around for a while.

<br/>

Usually the goal is to get the change, hence tickets, out to end user as fast as possible in a reliable manner and with as high quality as possible.

<br/>

At first, our client proposed that the WIP for in progress items to be around the number of developers. It makes sense and it's a good start, but it won't address the invisible bottleneck.

<br/>

So, the discussion prompted me to write down how we did wip in my previous team. We define WIP limit as number of developers / 2 + 1. So, with 5 developers, it will be 5/2 + 1 = 3 tickets. With number of WIP less than the number of developers, it actually has a lot of benefits such as:

- If there's an urgent ticket that needs to be completed asap, we have available developers to work on it.
- Developers do more than just coding. This way, we also have enough developers to work on things other than coding such as: brainstorming, investigation, code review, and testing.
- Sometimes with our client, we discuss blockers as a team. Problem with that is the more blockers, the more time we need. Thus with less tickets in flight, blockers become more manageable and we have enough developers to help if needed. Imagine 20 tickets in flight and 50% will be discussed vs only 10 tickets.
- Each developer will only have 1 ticket that is being worked on which removes context switching.

<br/>

One of the common question is what happened when WIP limit has been reached and some developers are available. This is when pair programming or sometimes in our case, we have multiple developers work on a ticket, forming a sub-team comes into play. The developers that are available can ask the team if anyone else need help. Or they can do code review or help with testing or writing documentation, etc. Thus, they are still needed, not just sitting idle.

<br/>

Another thing that came to mind is if we have multiple developers working on a single ticket, we have the following benefits:

- If one developer is not available, the other developer will still work on the ticket and thus it is still progressing.
- I also noticed that there's automated knowledge sharing happening between developers since they will be communicating.

<br/>

Another thing is our client uses story point. Problem with story point is it's a guess and thus highly inaccurate. And also it is incompatible with WIP. Some uses story point as WIP, but this still doesn't fix the fundamental flaw that story point is inaccurate. Yet another uses hours as story point which is just another variation of the same thing. In our company, we just work on ticket continuously. No sprint, no iteration. Prediction on when a ticket will be dones is more accurate than story points as we uses historical ticket completion data.