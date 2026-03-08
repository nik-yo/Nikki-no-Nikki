---
date: 2025-12-30
---

::post-title{:date="date"}
# Amazon ECR Accessing Private Repository through AWS CLI
::

::notes
This is a repost from my old blog. First posted in 12/8/2020.
::

<br/>

Remote repository is always an easy way to share code. However, I can't seem to find an easy way to access my private repository in ECR.

<br/>

In order to push or pull from ECR, we have to first login via AWS CLI and pass the credentials to docker. The script is pretty straightforward and will work in most cases except mine:

::code-block
```
aws ecr get-login-password --region <region> | sudo docker login --username AWS --password-stdin <registry_url>
```
::

<br/>

The problem is I save my credentials for the registry in a different AWS CLI profile, thus I need to change my script to the following so I can push to and pull from the private repository:

::code-block
```
aws ecr get-login-password --region <region> --profile <custom_profile> | sudo docker login --username AWS --password-stdin <registry_url>
```
::
