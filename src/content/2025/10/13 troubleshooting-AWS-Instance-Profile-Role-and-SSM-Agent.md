---
date: 2025-10-13
---

::post-title{:date="date"}
# Troubleshooting AWS Instance Profile, Role, and SSM Agent
::

::notes
This is a repost from my old blog. First posted in 1/17/2019.
::

<br/>

During some AWS troubleshooting session, I happened to notice that there is a possibility of stale role attached to EC2. 

<br/>

My scenario is as follow: We launched a new EC2 and by default no role attached to it. Then we programmatically create a role, let's call it EC2Role which we then associate it with a new Instance Profile. We then attach the Instance Role to our new EC2. In our case, the EC2Role allows SSM Agent to have permission to run commands.

<br/>

For somewhat reason, we decided to delete the EC2Role and again programmatically recreate a new role with the same name and associate it with a new Instance Profile. We noticed that when we don't detach the old role (which has the same name with the new one) from the EC2, the old role will still be attached to the EC2 although the old role itself has been deleted. 

<br/>

Hence, we were confused on why the EC2 which has the right role attached to it will not run command sent by SSM. The SSM Agent log keeps saying the token is invalid.

<br/>

I did couple of troubleshooting steps. First, I restarted the SSM Agent and that didn't solve the problem. Second, in a different instance with the same problem, I detached and reattached the role and that didn't work either. Third, I combined previous two steps on a single instance, so I detached and reattached the role then restarted the agent and it works afterwards.
