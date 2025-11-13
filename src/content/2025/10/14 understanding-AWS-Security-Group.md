---
date: 2025-10-14
---

::post-title{:date="date"}
# Understanding AWS Security Group
::

::notes
This is a repost from my old blog. First posted in 2/8/2019.
::

<br/>

We were playing with AWS Aurora Serverless. After figuring out how to configure and start the database cluster, we were having trouble connecting to it from our EC2 instance. Few hours later, I tried tracing what was going on with Flow Logs in the subnet. We realized it was a network and/or security issue. Checking all possible connections and security, we think everything has been configured correctly. But only after trial and error, we found out that our understanding of security group was incorrect.

<br/>

Due to AWS security group being promoted as stateful, we understand it as if we specify an entry in Inbound tab, we don't need to specify it in Outbound. Sadly, that is not what stateful means. Each entry specifies the allowed origin of the network request and the response will be automatically allowed. For example, if we allow in Inbound only, a request can come from outside and allowed to the EC2 instance and out, but a request from the instance won't be allowed to go out of the instance. 

<br/>

And that is precisely what our problem is, we have an entry in the Inbound tab, but we try to connect from inside the EC2 instance, but was rejected because we don't allow the connection on the Outbound tab. As soon as we allow the connection on the Outbound tab, the problem is fixed.