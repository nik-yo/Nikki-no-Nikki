---
date: 2025-09-17
---

::post-title{:date="date"}
# Autocomplete and Radio Button
::

::notes
This is a repost from my old blog. First posted in 10/7/2016.
::

<br />

When I created my web page, I noticed that the state of my radio buttons stays when I navigated away to another page and then back to the same page. I was confused at first and quickly found out that by default the browser (in my case, firefox) has autocomplete enabled by default and was saving the state somehow. Quick search online allow me to turn the feature on/off by adding autocomplete attribute.

::code-block
```
<input type="radio" autocomplete="off"/>
```
::

https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion