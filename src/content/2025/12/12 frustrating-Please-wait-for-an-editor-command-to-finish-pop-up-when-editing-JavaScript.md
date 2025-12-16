---
date: 2025-12-12
---

::post-title{:date="date"}
# Frustrating "Please wait for an editor command to finish" Pop-up When Editing JavaScript
::

::notes
This is a repost from my old blog. First posted in 7/22/2020.
::

<br/>

It happens to be I need to edit a massive JavaScript file and I tried to speed through it, however, my instance of Visual Studio 2017 is not helpful by trying to be helpful.

<br/>

Every single key stroke triggers a 1-5 seconds pause which sometimes caused a pop-up with "Please wait for an editor command to finish" message to show. Worse, that pop-up is not cancelable.

<br/>

Additionally, my CPU usage was hovering at 80-90% just editing JavaScript! As of this time, my Visual Studio 2017 version is 15.9.25.

<br/>

Seems like it is triggered by some auto-suggestion tools which in Visual Studio, Intellisense seems to be the culprit. I ended up going to `Tools > Options > JavaScript/TypeScript > Formatting > General`{.bg-gray-200 .p-2 .rounded} and uncheck everything under Automatic Formatting. 

<br/>

Even after that I still noticed a half-a-second delay on some keystrokes, so I also uncheck `Tools > Options > JavaScript/TypeScript > Linting > General > Enable ESLint`{.bg-gray-200 .p-2 .rounded}.

<br/>

That made my life a whole lot easier. It also drops my CPU usage to 10-20%. 