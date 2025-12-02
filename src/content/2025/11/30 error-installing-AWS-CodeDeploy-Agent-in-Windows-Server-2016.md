---
date: 2025-11-30
---

::post-title{:date="date"}
# Error Installing AWS CodeDeploy Agent in Windows Server 2016
::

::notes
This is a repost from my old blog. First posted in 6/8/2020.
::

<br/>

It has been a while since I added an EC2 instance to our CI/CD pipeline. And this time, I need to allow a Windows Server 2016 to receive artifacts from AWS CodeDeploy by installing the agent. And installing the CodeDeploy agent is not straight forward.

<br/>

I followed the instructions to install using Windows PowerShell:

[https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-windows.html#codedeploy-agent-operations-install-windows-powershell]{.text-blue-600}

<br/>

It went smoothly until it tried to start the windows service which failed with the following error message:

::code-block
```
Service 'CodeDeploy Host Agent Service' (codedeployagent) failed to start. 
Verify that you have sufficient privileges to start system services
```
::

<br/>

The error message can be found in the log file which is located at:
`C:\temp\host-agent-install-log`{.bg-gray-200 .p-2 .rounded}.

<br/>

The following article helps me solving the installation issue:

[https://github.com/aws/aws-codedeploy-agent/issues/189]{.text-blue-600}

<br/>

Basically, we need to add Windows Defender exclusions for the installation and execution folders. In my case, it will be:

::code-block
```
Add-MpPreference -ExclusionPath ("C:\ProgramData\Amazon\CodeDeploy","$env:windir\Temp")
```
::

The following worked in Windows Server 2016 but somehow didn't work in 2019:

::code-block
```
Add-MpPreference -ExclusionPath ("C:\temp", "C:\ProgramData\Amazon\CodeDeploy") 
```
::

Updates
June 18, 2020
The last time I checked, it is no longer an issue in the following AMI:
Windows_Server-2016-English-Full-Base-2020.06.10

<br/>

November 25, 2020
It happened to me again on Windows Server 2019. This time the EC2 is in private subnet, so I also checked the following:

- Permission attached to EC2 instance profile
- Access to endpoints:
  https://stackoverflow.com/questions/48023692/aws-codedeploy-not-working-in-private-vpc
- Event Viewer > Application
- Event Viewer > System. I noticed the following error message: 
 `A timeout was reached (30000 milliseconds) while waiting for the CodeDeploy Host Agent Service service to connect.`{.bg-gray-200 .p-2 .rounded}
The command above still worked, but need a slight change. Along with that, extending the timeout in the following article might help.
[https://kevsoft.net/2017/10/02/codedeploy-agent-failing-to-start.html]{.text-blue-600}