---
date: 2026-07-21
---

::post-title{:date="date"}
# Office Script as Alternative to VBA Macro
::

<br/>

During our retrospective session with our client, we have decided that the stand up leader will call each person's name in turn to reduce delay and awkward silence. Our stand up leader suggested that the list of people be randomized so as not the same person will go first every time.

<br/>

That got me curious on how we can randomize the list. The stand up leader is not technically savvy, so most probably will attempt to use online service. However, online service that doesn't necessarily able to retain the list, so the list might need to be filled every day.

<br/>

So, my thought is if I can randomize the list in Excel and add a button, it is at least easy enough to use. Of course, the first thought is to use VBA, but I'm reluctant to use macro since it's potentially blocked by default.

<br/>

That's when I stumbled upon Office Script, a JavaScript based script runner that's integrated with Excel. With AI, I got started really quick and able to create a script that will randomize the used cells.

<br/>

One small hiccup is when I added a button tied to the script, it didn't work as expected and highlight random cell on the worksheet instead. Running the script directly works great. I found out later that I need to save the script in order for the button to pick up the logic. So, save often!

<br/>

To learn more, visit: [https://learn.microsoft.com/en-us/office/dev/scripts/overview/excel]{.text-blue-600}