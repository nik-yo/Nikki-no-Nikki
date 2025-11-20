---
date: 2025-11-19
---

::post-title{:date="date"}
# AWS CloudFormation Starting EC2 Instance Requires ec2:RunInstances Permission
::

::notes
This is a repost from my old blog. First posted in 1/20/2020.
::

<br/>

Another weird case with AWS CloudFormation. I attempted to start an EC2 instance and for somewhat reason it failed and said it doesn't have `ec2:RunInstances`{.bg-gray-200 .p-2 .rounded} permission, but it does. After few checks, I found out that the cause is the `IamInstanceProfile`{.bg-gray-200 .p-2 .rounded}. If it is set, the error happens. 

<br/>

With clue from some online forum, I tried adding `iam:PassRole`{.bg-gray-200 .p-2 .rounded} permission for CloudFormation instead of the required `ec2:RunInstances`{.bg-gray-200 .p-2 .rounded} and it works!