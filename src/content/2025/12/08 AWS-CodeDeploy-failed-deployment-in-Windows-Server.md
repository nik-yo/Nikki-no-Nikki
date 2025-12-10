---
date: 2025-12-08
---

::post-title{:date="date"}
# AWS CodeDeploy Failed Deployment in Windows Server
::

::notes
This is a repost from my old blog. First posted in 7/12/2020.
::

<br/>

Our CI/CD pipeline has been going smoothly for a long time. Today, I happened to need to deploy something and it failed.

<br/>

First, I looked in the console and viewing the events, it failed at the first step which is ApplicationStop.

<br/>

So I thought the application is still running which is usually the case when the deployment failed but this time no instance of my application is being run at that moment.

<br/>

Next, I check the log file which can be found in:

[https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-view-logs.html]{.text-blue-600}

<br/>

The log file indicated the agent can't connect to the host. One of the error message in the log is "certificate verify failed".

<br/>

I restarted the CodeDeploy agent but the issue persisted.

<br/>

Eventually, by uninstalling and updating the CodeDeploy agent solves my issue. In my case, which is in Windows Server, I had to stop the agent service and uninstall to enable the update to success.

[https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-update-windows.html]{.text-blue-600}

