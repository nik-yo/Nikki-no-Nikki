---
date: 2025-12-13
---

::post-title{:date="date"}
# EF Sum Error Due to Empty Rows After Filtering on MySQL
::

::notes
This is a repost from my old blog. First posted in 7/23/2020.
::

<br/>

I actually have been waiting when I will encounter this kind of error. This time the error happens when performing EF query on MySQL database.

<br/>

After filtering, the query returns empty rows thus sum can't work. The error message in my case is:

::code-block
```
"The cast to value type 'System.Decimal' failed because the materialized value is null. Either the result type's generic parameter or the query must use a nullable type."
```
::

<br/>

The following is an example code:

::code-block
```
Dim totalPrice = dbContext.Items.Where(Function(i) i.Color = "Blue").Sum(Function(i) i.Price)
```
::

<br/>

However it works fine if we execute the query first before Sum, but it requires the rows to be pulled to memory which can be resource intensive.

::code-block
```
Dim totalPrice = dbContext.Items.Where(Function(i) .Color = "Blue").ToList().Sum(Function(i) i.Price)
```
::

<br/>

One helpful article:

[https://coding.abel.nu/2012/08/null-sematics-in-linqs-sum/]{.text-blue-600}

The solution in my case is to perform projection, followed by `DefaultIfEmpty`{.bg-gray-200 .p-2 .rounded} and call `Sum()`{.bg-gray-200 .p-2 .rounded} afterwards. The code becomes:

::code-block
```
Dim totalPrice = dbContext.Items.Where(Function(i) i.Color = "Blue").Select(Function(i) i.Price).DefaultIfEmpty(Decimal.Zero).Sum()
```
::
