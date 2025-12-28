---
date: 2025-12-24
---

::post-title{:date="date"}
# Unwanted Dollar Sign in Bash Script
::

::notes
This is a repost from my old blog. First posted in 9/18/2020.
::

<br/>

The script that I used ran fine for various flavors of Linux for a long time. But somehow, it produced unwanted dollar sign on Ubuntu 18.04, so my hours of troubleshooting starts.

<br/>

The simplest one I can say is I use echo with tab and variables and piped that to awk through AWS Systems Manager. It is similar to the following:

::code-block
```
v='variable'
TAB=$'\t'
echo "${v}${TAB}" | awk '{print $0}'
```
::

<br/>

In many flavors of Linux other than Ubuntu 18.04, even in Ubuntu 16.04, it produced the expected result:

::code-block
```
variable
```
::

<br/>

However, in Ubuntu 18.04, it ends the result with an extra dollar sign:

::code-block
```
variable$
```
::

<br/>

At first, I thought it marks end of line or the typical `\0 (NUL character)`{.bg-gray-200 .p-2 .rounded} that marks end of string, so I tried various ways to remove it such as using tr, gsub, etc. But none of them works.

<br/>

Eventually, I found out that the dollar sign comes from the TAB variable. To solve it, I have to replace the above with:

::code-block
```
echo -e "${v}\t"
```
::