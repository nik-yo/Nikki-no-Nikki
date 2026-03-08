---
date: 2026-01-31
---

::post-title{:date="date"}
# AWS Cognito Error on Sign Up
::

::notes
This is a repost from my old blog. First posted in 9/29/2024.
::

<br/>

I was exploring AWS Cognito for authentication. It works great, but I got the following error message after I tested the sign up process: An error was encountered with the requested page. I found out later that I misunderstood the `AutoVerifiedAttributes`{.bg-gray-200 .p-2 .rounded} field in my CloudFormation. I thought it would mark an email or phone number as verified without actually verifying them. Apparently, it means it will try to verify either email or phone number. So, when I set it to email, it sent a verification email and the sign up process went without error.