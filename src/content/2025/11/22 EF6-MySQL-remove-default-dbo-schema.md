---
date: 2025-11-22
---

::post-title{:date="date"}
# EF6 MySQL Remove Default dbo Schema
::

::notes
This is a repost from my old blog. First posted in 3/18/2020.
::

<br/>

As we all know, Entity Framework has default schema of "dbo", but MySQL will ignore it when performing migrations. But it gets troublesome when we try to rollback, because the dbo doesn't get ignored in that case. 

<br/>

Due to the fact that dbo doesn't get ignored, rolling back the migrations often caused error in my case. And removing the schema manually every time a new migration file is generated is tiring. That prompted me to find a way to remove the schema when new migration file is generated. 

<br/>

My first attempt is by looking inside the Configuration file. In my case, I have a custom HistoryContext because some MigrationHistory keys are just too long. And the custom HistoryContext is set in the Configuration file constructor:

::code-block
```
SetHistoryContextFactory(MySqlProviderInvariantName.ProviderName, Function(connection, schema) New MySqlHistoryContext(connection, schema))
```
::

<br/>

After some online search, it seems like for some databases, setting the schema to something else alters the generated file, so I give it a try. My code thus becomes:

::code-block
```
SetHistoryContextFactory(MySqlProviderInvariantName.ProviderName, Function(connection, schema) New MySqlHistoryContext(connection, ""))
```
::

However, it doesn't work at all. Then I think there maybe a way to set it on the DbContext level and I found the following code which I apply to the OnModelCreating method:

::code-block
```
modelBuilder.HasDefaultSchema(String.Empty)
```
::

And this time it works! No more dbo. But on the newly generated migration file, it has `MoveTable()`{.bg-gray-200 .p-2 .rounded} code for existing tables. In my case, I just comment them out since schema was ignored anyway.

<br/>

Finally, out of curiosity, I just tried changing the schema to null instead of empty string. However, that one doesn't work in my case as it tries to set the schema back to dbo for my database.

<br/>

So the final solution is to set the default schema to empty string.
