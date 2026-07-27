---
date: 2026-07-06
---

::post-title{:date="date"}
# Debugging Session Storage
::

<br/>

I have a need to check the value of a session storage item. The problem is as soon as the session storage item is set, it will navigate and the new page will then retrieve the item and remove the content.

<br/>

Consulting google and the AI came up with a neat solution by using a JavaScript Interceptor.

<br/>

Basically, just run the following on the console to override the native sessionStorage.setItem method.

::code-block
```
var originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function(key, value) {
  debugger; // this will create a breakpoint and pause the execution.
  originalSetItem.apply(this, arguments);
};
```
::

<br/>

Running it again, it will pause, so I can see the value before it is removed.
