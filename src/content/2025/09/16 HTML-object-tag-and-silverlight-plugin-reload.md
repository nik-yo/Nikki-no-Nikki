---
date: 2025-09-16
---

::post-title{:date="date"}
# HTML Object Tag and Silverlight Plugin Reload
::

::notes
This is a repost from my old blog. First posted in 10/6/2016.
::

<br />

I have a Silverlight plugin that I don't want it to be refreshed or reloaded. But in my case, it always reloaded itself though nothing on the page caused a postback. Later on, I found out that I have a javascript code that hide and show the container of the plugin (div with id of someDiv in the code below).

::code-block
```
<div id="someDiv">
  <object data="data:application/x-silverlight-2," type="application/x-silverlight-2">
  ...
  </object>
</div>
```
::

Apparently that causes the object tag to reload the plugin. My workaround thus is to set the height of the object tag to 0 px, that solves the problem.


