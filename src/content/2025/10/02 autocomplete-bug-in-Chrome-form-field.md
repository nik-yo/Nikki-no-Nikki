---
date: 2025-10-02
---

::post-title{:date="date"}
# Path.Combine and Path.GetFullPath
::

::notes
This is a repost from my old blog. First posted in 9/13/2018.
::

<br/>

I just update my website and everything works great in Firefox. As I test it in Chrome, I noticed when I navigate to another and then press the back button, my text field was populated with wrong data. The data was the default value of other text field before the navigation.

<br/>

As I was looking around, I found out that it is a bug in WebKit based browsers. Some people suggested to use `autocomplete="off"`{.bg-gray-200 .p-2 .rounded} property on all input field. But for my case, it is enough to put the attribute to all text fields `<input type="text"/>`{.bg-gray-200 .p-2 .rounded}.