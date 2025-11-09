---
date: 2025-10-04
---

::post-title{:date="date"}
# Entity Framework Sorting/ Ordering and Dynamic LINQ
::

::notes
This is a repost from my old blog. First posted in 10/2/2018.
::

<br/>

One of my coworkers would like me to update my `IEnumerable SortBy`{.bg-gray-200 .p-2 .rounded} extension method to support multiple columns. As I was working on it, I stumbled upon a nice StackOverflow question on [Dynamic LINQ OrderBy on IEnumerable<T>](https://stackoverflow.com/questions/41244/dynamic-linq-orderby-on-ienumerablet-iqueryablet){.text-blue-600}.

<br/>

They are all awesome. I decided to try Dynamic LINQ by adding it through Nuget. However, I soon found that Dynamic LINQ only support property names. In some cases, we want to be able to sort by specifying column attribute value, so I still use my own code which works just fine although it might not be optimized for performance.

For example in VB.NET:

::code-block
```
Public Class Customer
    <Column c_name="">
    Public Property Name As String

    <Column c_age="">
    Public Property Age As Integer
End Public

Dim sortedByName = dbContext.Customers.AsEnumerable().SortBy("c_Name, c_Age DESC")
```
::

The gist for my code can be found in:
[https://gist.github.com/nikyodo85/202fc2d417d9eb030d30896ccc862b7d]{.text-blue-600}