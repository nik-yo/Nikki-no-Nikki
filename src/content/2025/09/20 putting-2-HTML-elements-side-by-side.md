---
date: 2025-09-20
---

::post-title{:date="date"}
# Putting 2 HTML Elements Side by Side
::

::notes
This is a repost from my old blog. First posted in 10/24/2016.
::

<br />

Many times I have to battle on which methods are the best in putting two HTML elements side-by-side. Let say we have the following elements:

::code-block
```
<div class="Container">
   <div class="LeftColumn"></div>
   <div class="RightColumn"></div>
</div>
```
::

Based on my own experience and preference, I usually use one of these 3 css options. For clarification, they are by no means comprehensive ways to style two elements nor the points are meant to capture all possibilities.

Option 1:

::code-block
```
.LeftColumn, .RightColumn {
   display:inline-block;
   width: 50%;
}
```
::

Option 2:

::code-block
```
.LeftColumn {
   float: left;
}
.RightColumn {
   float: right;
}
```
::

Option 3:

::code-block
```
.Container { display: flex; flex-direction: row; justify-content: space-between; }
```
::

Each option has its own characteristics.

Option 1:

It will create a gap between the two elements.
If browser is shrinked width-wise, the second element will not be automatically wrapped.

Option 2:

The first element will be anchored to the left and the second element will be anchored to the right.
To prevent the next element from being rendered unexpected, a third element with css property of clear: both is needed.
If browser is shrinked width-wise, the second element will be placed underneath the first.
vertical-align property and some other properties have no effect.

Option 3:

Same points as option 2 but without the need of the third element.
New CSS 3 properties but it has more ways for customization.
