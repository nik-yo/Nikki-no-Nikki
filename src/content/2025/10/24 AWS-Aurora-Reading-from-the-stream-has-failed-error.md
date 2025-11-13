---
date: 2025-10-24
---

::post-title{:date="date"}
# AWS Aurora "Reading from the stream has failed" Error
::

::notes
This is a repost from my old blog. First posted in 5/14/2019.
::

<br/>

We had problem with Aurora SQL throwing error when it is in sleep (pause) mode. By default, it is set to sleep when idle for 5 minutes. After few attempts, we managed to extend the timeout which is command timeout (not to be confused with connection timeout) to 60s in our case to prevent the error from happening. The timeout can be set in connection string:

::code-block
```
Server=server;Database=database;Uid=username;Pwd=password;Default Command Timeout=60
```
::

Reference:
[https://www.connectionstrings.com/mysql-connector-net-mysqlconnection/specifying-default-command-timeout/]{.text-blue-600}

**Update 12/3/2019**
The above didn't work somehow on our ASP.NET application that used EntityFramework, so we have to specify it in our ApplicationDbContext constructor and increase it to 5 minutes (300s). The following is the VB.NET version:

::code-block
```
Public Sub New(existingConnection As Common.DbConnection, contextOwnsConnection As Boolean)
	MyBase.New(existingConnection, contextOwnsConnection)
	Database.CommandTimeout = 300
End Sub
```
::