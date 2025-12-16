---
date: 2025-12-15
---

::post-title{:date="date"}
# Amazon CloudWatch GetMetricData API SampleCount Returns 0
::

::notes
This is a repost from my old blog. First posted in 8/17/2020.
::

<br/>

One of our code is to keep track on how many data points are there for each CloudWatch metric. So, I usually use the GetMetricData API with statistic set to SampleCount. But since we only care about the total, I don't use short period (high resolution). Partly, it is to reduce the amount of data returned. However, in one case, it returns 0 for a particular month.

<br/>

According to the following documentation, period has to be a multiply of 60:

[https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDataQuery.html]{.text-blue-600}

<br/>

No problem, since my start time and end time is exactly one month apart, I will just set the period to the number of seconds between start time and end time to get highest number of period. It works for some months, it returns 0 in this particular case.

<br/>

Strange until I found out in a different documentation that there's a max period of 86,400 seconds (one day).

<br/>

[https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic]{.text-blue-600}

<br/>

I change my period to 86400 and it no longer returns 0.

