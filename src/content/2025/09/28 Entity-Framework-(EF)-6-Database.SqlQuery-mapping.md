---
date: 2025-09-28
---

::post-title{:date="date"}
# Entity Framework (EF) 6 Database.SqlQuery Mapping
::

::notes
This is a repost from my old blog. First posted in 8/27/2018.
::

<br/>

I bumped into a problem with mapping results from manually crafted sql query to object using EF. Somehow, it doesn't seem to recognize the column attribute. And I found out that it really doesn't and they don't plan to enhance EF 6, although there seems to have the option in EF Core to do the mapping.

<br/>

To illustrate my problem better, suppose my database column name is **pk** and would like to map it to **ID** property. Usually, using `[Column("pk")]`{.bg-gray-200 .p-2 .rounded} will solve the mapping, however, it doesn't work if the query was executed via `dbContext.Database.SqlQuery("SELECT pk FROM TableName")`{.bg-gray-200 .p-2 .rounded}.

<br/>

So I have to either change the **ID** property to **pk** or the one that I preferred is to change the query to `dbContext.Database.SqlQuery("SELECT pk AS ID FROM TableName")`{.bg-gray-200 .p-2 .rounded}.