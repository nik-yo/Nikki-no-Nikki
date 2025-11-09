---
date: 2025-09-25
---

::post-title{:date="date"}
# XMLSerializer and Boolean
::

::notes
This is a repost from my old blog. First posted in 5/5/2017.
::

I rewrote a project to utilize XMLSerializer instead of manually append xml tags. It works great until I encountered problem with backward compatibility on Boolean type. Our client is sending boolean value with first letter capitalized. "True" and "False" and apparently XMLSerializer were unable to deserialize the value as boolean. Because by convention, boolean in XML has to be all lower case. Searching online I found out that I need to do a small trick.

<br/>

Instead of:

::code-block
```
<XmlElement("isvalid")>
Public Property IsValid As Boolean
```
::

<br/>

I have to rewrite it as:

::code-block
```
<XmlElement("isvalid")>
Public Property IsValidString As String
   Get
      Return IsValid.ToString().ToLower()
   End Get
   Set
      Boolean.TryParse(value, IsValid)
   End Set
End Property

<XmlIgnore>
Public Property IsValid As Boolean
```
::

The modified version can handle both formats.