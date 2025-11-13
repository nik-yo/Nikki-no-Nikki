---
date: 2025-09-01
---

::post-title{:date="date"}
# AWS SSM Linux Shell Script Closing Paren Expected Error
::

::notes
This is a repost from my old blog. First posted in 3/21/2019.
::

<br/>

I ran my scripts through AWS SSM and received the "closing paren expected" error message. Quick check on my code, I was missing items in two different situations:

1. I was missing closing parentheses `\)`{.bg-gray-200 .p-2 .rounded}, so adding it solves the issue. My code was like:

::code-block
```
if [ \( <expr> ]; then <do this>; fi
```
::

2. My closing parentheses was not prefixed by space, so adding a space fixed it. It was like:

::code-block
```
if [ \( <expr>\) ]; then <do this>; fi
```
::