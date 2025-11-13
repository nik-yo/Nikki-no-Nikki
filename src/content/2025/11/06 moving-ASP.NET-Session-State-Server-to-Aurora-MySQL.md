---
date: 2025-11-06
---

::post-title{:date="date"}
# Moving ASP.NET Session State Server to Aurora/MySQL
::

::notes
This is a repost from my old blog. First posted in 11/17/2019.
::

<br/>

Our database was in MS SQL Server and we were in the middle of moving to Aurora with MySQL compatibility.And obviously there are differences to be resolved and one of them is we are not sure on how to move the ASP.NET Session state.

<br/>

After several troubleshooting sessions (pun not intended), I finally managed to move the session state server to Aurora. The following two webpages have been very helpful, albeit the first one is outdated:

[https://www.codeproject.com/Articles/633199/Using-MySQL-Session-State-Provider-for-ASP-NET]{.text-blue-600}
[https://dev.mysql.com/doc/connector-net/en/connector-net-programming-asp-provider.html]{.text-blue-600}

<br/>

My steps are as follow:

1. Disable the current state server by commenting/removing the sessionState tag under system.web in web.config.
2. Add MySql.Web Nuget package (As of this post, the working one is version 8.0.17).
3. Add new sessionState tag under system.web

::code-block
```
<sessionState mode="Custom" customProvider="MySqlSessionStateStore"> 
   <providers> 
      <add name="MySqlSessionStateStore" type="MySql.Web.SessionState.MySqlSessionStateStore, MySql.Web, Version=8.0.17.0, Culture=neutral, PublicKeyToken=c5687fc88969c44d" connectionStringName="LocalMySqlServer" applicationName="/" autogenerateschema="True" />
</providers> 
</sessionState>
```
::

Note the necessary attributes:

::code-block
```
mode="Custom"
customProvider="<provider_name>"
autogenerateschema="True"
```
::

4. Add connection string. I would prefer to do this programmatically but I can't find a way to do it as of this post. Also, database has to be specified in the connection string.
5. Create schema/database in Aurora/MySql. I found out that MySql.Web doesn't automatically create the schema/database but it will generate necessary tables.

<br/>

That is all to get it to work for me. Another thing to note is the autogenerateschema attribute was not available through autocomplete/intellisense. However, I can find some other attributes as properties of MySqlSessionStateStore class.

[https://dev.mysql.com/doc/dev/connector-net/8.0/html/T_MySql_Web_SessionState_MySqlSessionStateStore.htm]{.text-blue-600}

