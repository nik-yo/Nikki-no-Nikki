---
date: 2025-10-11
---

::post-title{:date="date"}
# Unable to GetPassword on AWS EC2 Launched from Windows Server 2016 Custom AMI
::

::notes
This is a repost from my old blog. First posted in 11/19/2018.
::

<br />

We found out that our custom AMI doesn't allow us to enable GetPassword from AWS console on any EC2 launched from it. After reading and some trial and error, we found out that `InitializeInstance.ps1`{.bg-gray-200 .p-2 .rounded} has to be enabled for the next boot.

[https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2launch.html#ec2launch-inittasks]{.text-blue-600}

To be complete, `LaunchConfig.json`{.bg-gray-200 .p-2 .rounded} has to have adminPasswordtype set to Random (default). Then, run the following PowerShell command:

::code-block
```
C:\ProgramData\Amazon\EC2-Windows\Launch\Scripts\InitializeInstance.ps1 -Schedule
```
::