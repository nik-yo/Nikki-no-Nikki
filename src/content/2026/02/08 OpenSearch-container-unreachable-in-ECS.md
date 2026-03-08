---
date: 2026-02-08
---

::post-title{:date="date"}
# OpenSearch Container Unreachable in ECS
::

::notes
This is a repost from my old blog. First posted in 12/2/2024.
::

<br/>

So, I have to launch Opensearch in ECS. And I need to add persistent storage. The container ran fine but it threw AccessDeniedException. And even though the container ran, my application was unable to connect to it. 

<br/>

After few tries, I found out that it is due to the permission of the directory where the data are supposed to reside. The container runs in ECS on EC2. The path, in this case, I use /usr/share/opensearch/data on EC2 is owned by root, but the container runs as ec2-user. So, I had to update the user data field on the launch template (since I used ASG) to include the following commands:

::code-block
```
mkdir -p /usr/share/opensearch/data
sudo chown 1000:1000 /usr/share/opensearch/data
```
::

That fixed the exception and the reachability issue.

