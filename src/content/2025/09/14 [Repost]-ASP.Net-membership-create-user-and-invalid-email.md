---
date: 2025-09-14
---

::post-title{:date="date"}
# ASP.Net Membership, Create User and Invalid Email
::

::notes
This is a repost from my old blog. First posted in 10/3/2016.
::

<br />

I was testing ASP.Net Membership user registration logic in my server. It runs fine till it throws `The E-mail supplied is invalid` error. Weird thing is I found out that all my data are correct through debugging and double checking my entry. Quick search says that `requiresUniqueEmail` attribute on Membership provider tag set to true is the problem. Ironically, I only have one email in the database.

Brushing my confusion aside, I remove the attribute, but it still doesn't work. And eventually found out that setting `requiresUniqueEmail="false"` fixed the whole thing.

Later on I also found out that by default, the attribute has value of true. That explains why removing the attribute doesn't work.

https://msdn.microsoft.com/en-us/library/system.web.security.membershipprovider.requiresuniqueemail(v=vs.110).aspx

I have yet found out why it doesn't work when it has true value and no data in the database. Hopefully one day when I have time to dig deeper.