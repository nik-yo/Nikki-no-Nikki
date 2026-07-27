---
date: 2026-07-22
---

::post-title{:date="date"}
# Bash Parameter Expansion Syntax
::

<br/>

I was in the middle of trying to understand a certain CI process and was wondering if there's a null-colaescing operator in bash. That's when I learned bash parameter expansion syntax.

<br/>

It's pretty simple, but powerful.

::code-block
```
${VARIABLE:-default_value}
```
::

<br/>

Basically, if VARIABLE is not defined, then it will use default_value. In the CI pipeline that I encountered, it is used as follow:

::code-block
```
${PROJECT_PATH:-.}
```
::

<br/>

So, if PROJECT_PATH is not defined, just default to the current directory.