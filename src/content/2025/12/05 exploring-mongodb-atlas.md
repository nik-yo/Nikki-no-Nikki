---
date: 2025-12-05
---

::post-title{:date="date"}
# Exploring MongoDB Atlas
::

<br/>

I'm planning to host my app in AWS. My app is built to integrate with MongoDB and AWS does have a MongoDB compatible service called DocumentDB. One thing I like about DocumentDB is AWS separate the compute from the storage. Which means, the compute can be removed without losing data and we will incur only the storage charge when we don't need it running. This is especially helpful especially during development.

<br/>

However, there are compatibility issue between MongoDB and DocumentDB. Not all MongoDB features are supported by DocumentDB. At the same time, I just used basic features, so it shouldn't be a problem. For more information: [https://docs.aws.amazon.com/documentdb/latest/developerguide/compatibility.html]{.text-blue-600}

<br/>

When I used DocumentDB before this, I utilized AWS EventBridge to add/remove DocumentDB on schedule to save significant cost. However, if I need it outside of the scheduled time, I need to remember to add the compute part back or I will end up spending a lot of time wondering why connection to DB is broken.

<br/>

As I was looking for alternative, I read on MongoDB Atlas. Basically it cloud ready MongoDB. Setup is easy and it has free tier which is great for my use case. By default, it has basic security in which it will only allow ingress from your local public IP. And small thing to watch out for is when I tried to retrieve the connection string, I need to find the username and password which is not very obvious on where to find them. We actually need to create a user and it is accessible from the side menu `Security > Database & Network Access`{.bg-gray-200 .p-2 .rounded}.

<br/>

Once I'm ready to deploy my application to AWS, I need to find out how to enable access through private network, so the data doesn't go through the internet which will greatly improve security and performance. I will update this post once I cross that bridge.