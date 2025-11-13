---
date: 2025-10-17
---

::post-title{:date="date"}
# Linux Script Conditional Conditions
::

::notes
This is a repost from my old blog. First posted in 3/21/2019.
::

<br/>

Like most people, I guess, I came from Windows background. Just recently, I have projects exploring multiple flavors of Linux and spending a lot of time to understand how conditions work in bash and/or shell script in Linux. And then my code didn't work and that took me on a journey.

Long time ago, I tried to do something as simple as the following:

::code-block
```
if (<expr1> or <expr2>) and (<expr3> or <expr4>) then <do this> fi
```
::

But things get complicated as the expressions involve which and grep commands.

For example, I'm checking if any python is installed, so my first attempt was

::code-block
```
if [ "`which python`" = "" -a "`which python3`" = "" ]; then echo "no python"; fi
```
::

then I realize that in RedHat, if there is no python installed, it will return a string containing "no python" instead of empty string, so my code becomes

::code-block
```
if [ \( "`which python`" = "" -o "`which python | grep 'no python'`" = "" \) -a \( "`which python3`" = "" -o "`which python3 | grep 'no python3'`" = "" \) ]; then 

     echo "no python"; 

fi
```
::

Well, it didn't work. Scrutinizing it a bit more. I found out that when there is no python, grep doesn't return empty string, but instead a failure code, so that turns my code into:

::code-block
```
if [ \( "`which python`" = "" -o "`which python | grep 'no python'`" \) -a \( "`which python3`" = "" -o "`which python3 | grep 'no python3'`" \) ]; then 

     echo "no python"; 

fi
```
::

Which seems to work so far, but for consistency, I prefer to use the flag -z to check for empty string and -n to check for non empty string, so the code becomes

::code-block
```
if [ \( -z "`which python`" -o -n "`which python | grep 'no python'`" \) -a \( -z "`which python3`"  -o -n "`which python3 | grep 'no python3'`" \) ]; then 

     echo "no python"; 

fi
```
::