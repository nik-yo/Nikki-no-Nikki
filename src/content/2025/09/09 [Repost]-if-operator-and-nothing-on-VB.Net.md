---
date: 2025-09-09
---

::post-title{:date="date"}
# If Operator and Nothing on VB.Net
::

::notes
This is a repost from my old blog. First posted in 9/27/2016.
::

<br />

I encountered an interesting thing recently in my programming experience. I have the following method:

::code-block
```
Private Sub SomeMethod(parameter As Nullable(Of Double))
   If parameter.HasValue Then
      'Do something
   Else
      'Do something else
   End If
End Sub
```
::

To call it, I use the following:

::code-block
```
SomeMethod(If(someObject.IsTrue, Nothing, someDouble))
```
::

However, it didn't work as I expect it to be. The one that confused me is, the HasValue always returns true although Nothing is being passed to the method. 

<br />

It took me awhile to realize that the If operator in this case will return the same type for both results (true and if false). And in VB.Net, Nothing equals default value which for Double is 0.0 while I want Nothing to act as Null. Thus to fix the issue, I have to rewrite it as:

::code-block
```
If someObject.IsTrue Then
   SomeMethod(Nothing)
Else
   SomeMethod(someDouble)
End If
```
::