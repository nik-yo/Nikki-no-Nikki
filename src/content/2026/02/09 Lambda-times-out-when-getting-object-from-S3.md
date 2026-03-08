---
date: 2026-02-09
---

::post-title{:date="date"}
# Lambda Times Out When Getting Object from S3
::

::notes
This is a repost from my old blog. First posted in 12/10/2024.
::

<br/>

I had the issue where Lambda function launched in private network times out when trying to get object from S3 bucket. Typically, there are two solutions:

1. Use S3 VPC endpoint (either gateway or interface) since it resolves s3 endpoint to private IP.
2. Attach public IP. This is done using NAT Gateway with Elastic IP (EIP).

<br/>

The problem is, in my case, the S3 bucket is in different region, different account, than the Lambda function while the first solution, even though S3 is a global service, the VPC endpoint can't resolve to S3 in different region. In short, the first solution only works when S3 bucket and Lambda function are in the same region.

<br/>

That left us with solution 2 which is more expensive but works. Also I need to make sure that the S3 bucket policy allows cross account access.
