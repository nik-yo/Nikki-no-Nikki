---
date: 2025-10-12
---

::post-title{:date="date"}
# AWS Systems Manager (SSM) Run Command Troubleshooting
::

::notes
This is a repost from my old blog. First posted in 1/17/2019.
::

<br />

I have been working with AWS SSM for couple of months, but I found the troubleshooting document on their website lacks straightforward answers. So I provide the problems that I encountered and the solution based on my experience.

<br/>

**Problem #1**: The instance is not visible in AWS Systems Manager Console although documentation says the agent has been installed by default.

<br/>

**Problem #2**: The instance is visible, but "Run Command" took too long and even timed out.

<br/>

**Solution**:
First thing I would check is whether the instance has a role attached to it.
If so, make sure the role has AmazonEC2RoleforSSM policy attached to it since permission is required for the agent to do health check.
If after all the above has been confirmed, check if the latest SSM agent has been installed and running.

<br/>

If SSM agent is at the latest and running, check if it is hibernating. The hibernate logic has exponential backoff, so it might not respond for a long time.

<br/>

If it is hibernating, we can simply restart the agent.

<br/>

On Windows, we can run `Restart-Service AmazonSSMAgent`{.bg-gray-200 .p-2 .rounded} PowerShell command.

<br/>

On Linux, we can run `sudo restart amazon-ssm-agent`{.bg-gray-200 .p-2 .rounded} shell command.

<br/>

If all the above fails, it is time to get into the log files.

<br/>

On Windows:
::code-block
```
%PROGRAMDATA%\Amazon\SSM\Logs\amazon-ssm-agent.log
%PROGRAMDATA%\Amazon\SSM\Logs\errors.log
```
::

On Linux:
::code-block
```
/var/log/amazon/ssm/amazon-ssm-agent.log
/var/log/amazon/ssm/errors.log
```
::

If log files doesn't give enough information, we can enable debug logging which will give more information. This requires quite a number of steps, so refer to the reference link below.

<br/>

[https://docs.aws.amazon.com/systems-manager/latest/userguide/troubleshooting-remote-commands.html#systems-manager-ssm-agent-debug-log-files]{.text-blue-600}