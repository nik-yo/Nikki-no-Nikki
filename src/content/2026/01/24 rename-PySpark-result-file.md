---
date: 2026-01-24
---

::post-title{:date="date"}
# Rename PySpark Result File
::

::notes
This is a repost from my old blog. First posted in 9/5/2024.
::

<br/>

Due to the distributed nature of Apache Spark, when writing result, we can't specify name for the result file. This makes the result file hard to predict which I need for my process orchestration. In my case, I need to write the result to S3 and I finally found a way to do this within a reasonable amount of time by utilizing aws wrangler, Panda, and optionally Arrow. I basically feed Spark dataframe to aws wrangler and have it write to S3 using a specific name.

<br/>

Here's link to my sample: [https://github.com/nik-yo/PySparkFilename]{.text-blue-600}
