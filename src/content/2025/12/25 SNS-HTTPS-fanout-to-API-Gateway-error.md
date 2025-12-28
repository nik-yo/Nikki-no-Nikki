---
date: 2025-12-25
---

::post-title{:date="date"}
# SNS HTTPS Fanout to API Gateway Error
::

::notes
This is a repost from my old blog. First posted in 11/11/2020.
::

<br/>

In one of my projects, I have an Amazon SNS subscription set up to fan out to HTTPS endpoint that is backed by Amazon API Gateway. The API Gateway has mapping template applied. 

<br/>

It went smoothly during test with Postman and the API Gateway test, but when SNS sends the Notification message, it threw an error. On CloudWatch log, the error message is:

::code-block
```
Execution failed: null
```
::

<br/>

Apparently SNS sends request with Content-Type of `text/plain`{.bg-gray-200 .p-2 .rounded} although the request body contains json while I only had mapping set for `application/json`{.bg-gray-200 .p-2 .rounded}. So adding mapping template for text/plain solves my problem.


