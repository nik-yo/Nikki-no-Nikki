---
date: 2025-09-18
---

::post-title{:date="date"}
# Display: inline-block;
::

::notes
This is a repost from my old blog. First posted in 10/7/2016.
::

<br />

Ok, I have two div tag that I want to put side by side, so I use display: inline-block; css property.

::code-block
```
<div style="display: inline-block; width: 30%;">...</div>
<div style="display: inline-block; width: 70%;">...</div>
```
::

I'm surprised to see there is a gap between the two divs somehow. And found out the way to fix the problem is to bring the divs together in the markup without any gap:

::code-block
```
<div style="display: inline-block; width: 30%;">
...</div><div style="display: inline-block; width: 70%;">...</div>
```
::

Ugly, yes, but it fixes the problem.

Edit: I have another case in which I want a gap between the two divs, so I don't bring the two divs together but I found out that somehow the second div is being put under the first one when printing. I ended up setting the second div with width of 69% so the total is 99% instead of 100% to make it work.