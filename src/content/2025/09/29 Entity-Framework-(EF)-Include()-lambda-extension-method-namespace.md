---
date: 2025-09-29
---

::post-title{:date="date"}
# Entity Framework (EF) Include() Lambda Extension Method Namespace
::

::notes
This is a repost from my old blog. First posted in 8/29/2018.
::

<br/>

As of this writing, seems like Visual Studio still unable to provide suggestion on what namespace to import for extension methods.

<br/>

I was looking into doing eager loading in EF and I am aware that I can use `Include()`{.bg-gray-200 .p-2 .rounded} method with lambda function. By default, it is not available and I can't remember which namespace it is located under. Of course, Visual Studio was not much help. After searching online, I found out that it is an extension method under `System.Data.Entity`{.bg-gray-200 .p-2 .rounded} namespace. I gotta remember from now on.