---
date: 2025-10-03
---

::post-title{:date="date"}
# Entity Framework (EF) Decimal Mapping to SQL Server
::

::notes
This is a repost from my old blog. First posted in 9/13/2018.
::

<br/>

We bumped into a strange issue. Value of our property was not saved to the database. We checked mapping, spelling, data type and none seems wrong.

<br/>

Eventually we found out that the decimal in our database has precision of (12, 6) and the SQL default is (18, 2). Problem is EF map Decimal data type to the SQL default precision thus our value was truncated.

To fix the issue, we put the following code in our DbContext under OnModelCreating method and our value was then saved correctly.

::code-block
```
protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
{
       modelBuilder.Entity<Class>().Property(object => object.property).HasPrecision(12, 6);
}
```
::
