---
date: 2026-07-08
---

::post-title{:date="date"}
# Changing Data Type of a Primary Key in SQL Server
::

<br/>

I'm helping my team changing primary key data type, but a simple ALTER command doesn't work due to the PK constraint. I was under impression that a table always need a PK, so I can't drop the constraint, but I tried it anyway.

::code-block
```
ALTER TABLE [table]
DROP CONSTRAINT PK_Id;
```
::

<br/>

And it works, I ended up with a table without any PK. Another ALTER to change the data type and one more ALTER to add back the PK constraint and voilà!

::code-block
```
ALTER TABLE [table]
ALTER COLUMN Id INT;
```
::

::code-block
```
ALTER TABLE [table]
ADD CONSTRAINT PK_Id PRIMARY KEY (Id);
```
::