---
date: 2025-09-01
---

::post-title{:date="date"}
# Salesforce CPQ Lightning Template Content Font Color
::

::notes
This is a repost from my old blog. First posted in 4/5/2019.
::

<br/>

Somehow I was involved in trying to change the font color in Salesforce CPQ template content. Seems easy but it is not working the way we want.

<br/>

We selected HTML as the content type and it comes with a nice rich text editor. As we change the font color, it looks great on the page. However, when we attach the template content to the quote template and preview the quote with that template, couple of things occurs:

- The font color is gone and reflected back to black
- It puts the next words which is supposed to be different color in a new line

<br/>

We double-checked the HTML and can't find anything wrong with it. So I decided to check which engine generates the quote preview PDF and found out that it is using Apache FOP. The fun thing is Apache FOP doesn't support HTML inherently, but it does support XSL, so that's what we used. We inject XSL and have Salesforce CPQ interpret it and render the font color that we expect.