---
date: 2025-01-03
---

::post-title{:date="date"}
# Error with No Exception Thrown When Transferring Data from Amazon Elasticsearch Service to Amazon DocumentDB
::

::notes
This is a repost from my old blog. First posted in 1/10/2021.
::

<br/>

We all wish our application performs as fast as possible and to do that sometimes we need to slow down.

<br/>

I have a project in which I have to get data from Amazon Elasticsearch, process the data and save the result into Amazon DocumentDB. I processed the data asynchronously so my processing application performed really fast. Since the result accuracy is important, I deleted the result and rerun the process just to make sure the same input will produce the same result. However, the results are different and no error nor any exception is thrown.

<br/>

After few hours of troubleshooting, I noticed that the data were not immediately available right after inserting them into DocumentDB. Since DocumentDB separate storage and compute, it took a bit of time to store the data and make them available.

<br/>

In my code, I need to immediately queried the inserted data. That means, sometimes, it saved the data fast enough that the data are available and sometimes they are not.

<br/>

So my solution is putting a slight delay between insert and query code and I managed to get consistent result.
