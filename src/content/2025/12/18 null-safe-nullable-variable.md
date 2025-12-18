---
date: 2025-12-18
---

::post-title{:date="date"}
# Null Safe Nullable Variable
::

<br/>

::danger
Please don't do this unless there's a solid reason.
::

<br/>

So, I happened to see Javascript code similar to the following on a production app which I can't see the reason. Assuming `redirectUrl`{.bg-gray-200 .p-2 .rounded} is never null.

::code-block
```
const url = isRedirect ? redirectUrl : "null";
```
::

<br/>

The above renders the check further down useless:

::code-block
```
if (url) {
  // Do something
}
```
::
