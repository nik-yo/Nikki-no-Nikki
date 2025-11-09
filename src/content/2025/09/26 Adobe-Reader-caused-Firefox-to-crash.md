---
date: 2025-09-26
---

::post-title{:date="date"}
# Adobe Reader Caused Firefox to Crash
::

::notes
This is a repost from my old blog. First posted in 5/18/2017.
::

<br />

We have an object tag on the page and it points to a pdf.

::code-block
```
<object data="https://www.somedomain.com./somedocument.pdf">
</object>
```
::

Weird scenario is some of us experience Adobe reader unable to open the document and crashed Firefox altogether. After many hours of search, I found out the problem was due to html encoded url. It is supposed to be `https://www.somedomain.com/somedocument.pdf#page=1&viewrect=1,2,3,4`{.bg-gray-200 .p-2 .rounded}.

<br/>

Instead, it becomes <code class="bg-gray-200 p-2 rounded">https://www.somedomain.com/somedocument.pdf#page=1<strong>&amp;amp;</strong>viewrect=1,2,3,4</code> and Adobe crashed after parsing that the encoded part.

<br/>

Removing the encoding fixed the issue.