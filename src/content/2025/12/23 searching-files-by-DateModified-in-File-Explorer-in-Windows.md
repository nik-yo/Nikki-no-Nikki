---
date: 2025-12-23
---

::post-title{:date="date"}
# Searching Files by DateModified in File Explorer in Windows
::

::notes
This is a repost from my old blog. First posted in 9/15/2020.
::

<br/>

I was in the middle of some project files restructuring and part of the process is making a back up of my files. When all is done, I went back to my back up folder to find files that I modified a day before.

<br/>

I know there has to be a way to do that, but it is not immediately obvious. But the following article was helpful to me.

[https://www.howtogeek.com/243511/how-to-search-for-files-from-a-certain-date-range-in-windows-8-and-10]{.text-blue-600}

<br/>

I opted for the UI solution, that is to use the Search tab. However, I can't find the search tab in File explorer, so I decided to go the harder route, to type into the search box.

<br/>

I managed to file my files by typing the following in the search box:

::code-block
```
datemodified:<start_date>..<end_date>
```
::

<br/>

For example:

::code-block
```
datemodified:9/14/2020..9/15/2020
```
::

<br/>

modified: instead of datemodified: works too. Also, the search tab finally shows after I got my search result.


