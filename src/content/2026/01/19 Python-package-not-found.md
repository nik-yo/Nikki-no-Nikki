---
date: 2026-01-19
---

::post-title{:date="date"}
# Python Package not Found
::

::notes
This is a repost from my old blog. First posted in 8/22/2024.
::

<br/>

Ok, this is a rookie issue. I had virtual environment created, activated and the package installed for that virtual environment, but somehow I bumped into this error:

::code-block
```
Import could not be resolved [Pylance]
```
::

Turns out to be the interpreter is pointing to the wrong one in my VS code bottom right. Changing it to the one in virtual environment fixed that.