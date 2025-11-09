---
date: 2025-10-10
---

::post-title{:date="date"}
# Entity Framework (EF) Slow Insert and SqlBulkCopy to the Rescue
::

::notes
This is a repost from my old blog. First posted in 11/1/2018.
::

<br />

There was a need to insert bulk data into the database and we are using Entity Framework as our ORM strategy. However, bulk insert took forever. Disabling Auto Detect Changes helps a little. So I decided to look into SqlBulkCopy and ended up writing one for Entity Framework. It is generic enough and can be found in [https://gist.github.com/nikyodo85/b82ffd56bb2f0d45a9860dadcdfdc01d]{.text-blue-600}.

<br/>

It works well so far. Some of the drawbacks are:
- It won't be able to auto insert relationship
- No validation check

<br/>

But very fast. To use it will be very similar to SqlBulkCopy:

::code-block
```
Dim efSqlBulkCopy As New EFSqlBulkCopy(Of MyEntityClass)(myDbContext)
efSqlBulkCopy.WriteToServer(listOfMyEntityClass)
```
::
