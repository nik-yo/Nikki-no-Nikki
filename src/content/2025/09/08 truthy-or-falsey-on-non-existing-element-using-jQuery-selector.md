---
date: 2025-09-08
---

::post-title{:date="date"}
# Truthy or Falsey on Non-Existing Element Using jQuery Selector
::

::notes
This is a repost from my old blog. First posted in 3/16/2016.
::

<br />

In JavaScript, there are terms called truthy and falsey. It is a very interesting way to find if an expression evaluates to true or false, so I decided to make use of it to evaluate whether the element selected by jQuery exists. For example:

::code-block
```
if ($('#elementId')) {
   //Do something if element exists
} else {
   //Do something else if element doesn't exist
}
```
::

However, when I used it against a jQuery variable that is supposed to hold HTML elements that met certain selector, it didn't work correctly. The problem is there is no element in the variable but it evaluates to true. This is due to jQuery returns Object [ ] which is empty array of object and the array itself exists thus the expression returns true.

<br />

Some suggestions I found online are:
Use length properties, so it becomes if ($('#elementId').length){}
In jQuery version 1.4 or above, you can use $.isEmptyObject() function
Another way that works for me is to get its first element:

::code-block
```
if ($('#elementId')[0]){}
```
::

<br />

The one that I often used lately is:

::code-block
```
var elements;

if (elements && elements.length) { }
```
::