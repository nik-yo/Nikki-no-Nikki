---
date: 2026-01-09
---

::post-title{:date="date"}
# AWS EC2 Can't Reach EC2 Metadata Service After Subnet Change
::

::notes
This is a repost from my old blog. First posted in 3/8/2021.
::

<br/>

Just another black box day. I had to move an EC2 instance to a different subnet, so I created an AMI out of it and launch it on a different subnet. Everything went well and it has no issue reaching the internet, but apparently not everything went well.

<br/>

The AWS agents such as SSM agent and CodeDeploy agent in the instance stop working. After checking the logs, they can't access the EC2 metadata. Since this is a Windows Server 2019 instance, it also shows that it is not activated, which is strange.

<br/>

On the following article, I found out that my issue was due to the "Gateway Address doesn't match that of the current subnet".

[https://aws.amazon.com/premiumsupport/knowledge-center/waiting-for-metadata/]{.text-blue-600}

<br/>

Running the suggested command fixed the issue:

::code-block
```
Import-Module c:\ProgramData\Amazon\EC2-Windows\Launch\Module\Ec2Launch.psm1 ; Add-Routes
```
::