---
date: 2026-01-07
---

::post-title{:date="date"}
# NullReferenceException on VB.NET Anonymous Type
::

::notes
This is a repost from my old blog. First posted in 2/17/2021.
::

<br/>

As much as we talk about decoupling in computer world, it is probably quite impossible to achieve. The best thing we can do is reduce coupling. But my point is actually on how fragile our code is nowadays. Seems like I have to keep relying on workarounds just to keep the application working.

<br/>

I have a working anonymous type and there is no change on that particular line. It looks like the following:

::code-block
```
Dim theValue = SharedFunction.GetValue()
```
::

<br/>

Some changes on the project, however, has nothing to do with that particular line of code. I switched to VS2019 instead of VS2017 and update Nuget packages without touching that code. The project builds successfully. But during runtime, that particular line threw NullReferenceException.

<br/>

At first, I thought it is my shared function, but it worked great when I ran it on Immediate Window.

<br/>

Few other things are the project is using .NET Framework 4.6.2 and the problematic code is nested inside an if statement which is nested inside #If directive.

<br/>

It might have something to do with the way the compiler generates the name of the anonymous type such as the "caution" section in the following article, but I didn't pursue any further.

[https://docs.microsoft.com/en-us/dotnet/visual-basic/programming-guide/language-features/objects-and-classes/anonymous-types]{.text-blue-600}

<br/>

I took the problematic code out from the if statement and #If directive and it works fine. So my code goes from:

::code-block
```
#If Not Debug Then
  If condition = true Then
    Dim theValue = SharedFunction.GetValue()
    DoSomething(theValue)
  End If
#End If
```
::

becomes:

::code-block
```
Dim theValue = SharedFunction.GetValue()

#If Not Debug Then
  If condition = true Then
    DoSomething(theValue)
  End If
#End If
```
::
