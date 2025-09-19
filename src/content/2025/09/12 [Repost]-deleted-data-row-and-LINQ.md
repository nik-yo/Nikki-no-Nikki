---
date: 2025-09-12
---

::post-title{:date="date"}
# Deleted Data Row and LINQ
::

::notes
This is a repost from my old blog. First posted in 9/27/2016.
::

<br />

Another interesting programming problem. I have the following code in VB.Net which throws error:

::code-block
```
dataRow.Delete() 'One of the rows in dataSet

dataSet.Tables("TableName").Rows.Cast(Of DataRow).FirstOrDefault(Function(dr) dr("ColumnName") = certainCondition)
```
::

<br />

The error says "Deleted row information cannot be accessed through the row". Pretty clear message, so I did the following:

::code-block
```
dataSet.Tables("TableName").Rows.Cast(Of DataRow).FirstOrDefault(Function(dr) dr("ColumnName") = certainCondition AndAlso dr.RowState <> DataRowState.Deleted)
```
::

<br />

But the code above throws the same error. Apparently the deleted check has to be the first condition which again makes sense. Thus, the following code runs perfectly fine:

::code-block
```
dataSet.Tables("TableName").Rows.Cast(Of DataRow).FirstOrDefault(Function(dr) dr.RowState <> DataRowState.Deleted AndAlso dr("ColumnName") = certainCondition)
```
::

There you go.