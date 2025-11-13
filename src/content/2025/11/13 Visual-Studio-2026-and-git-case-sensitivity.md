---
date: 2025-11-13
---

::post-title{:date="date"}
# Visual Studio 2026 and Git Case Sensitivity
::

<br/>

So, I'm trying to use Visual Studio Professional 2026 Insiders to work on my project. As I did a git pull, it complained about git case sensitivity. The error is `You're on a case-sensitive filesystem, and the remote you are trying to fetch from has references that only differ in casing.`{.bg-gray-200 .p-2 .rounded}.

<br/>

I never had any issue with this repo, so I thought I'll try using Visual Studio Professional 2022 to do git pull. For somewhat reason, VS 2022 git pull didn't complain about case sensitivity. Same case with git through command line. I'm still investigating the difference between the two. But the workaround is using VS 2022 or CLI.
