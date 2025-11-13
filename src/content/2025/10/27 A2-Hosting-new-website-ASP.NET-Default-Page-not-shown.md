---
date: 2025-10-27
---

::post-title{:date="date"}
# A2 Hosting New Website ASP.NET Default Page Not Shown
::

::notes
This is a repost from my old blog. First posted in 8/6/2019.
::

<br/>

This might affect other hosting too, but it just happened that I bumped into it in my A2 hosting account. Basically I created a new website and upload the files. I had the domain name servers updated. Everything looks good. But for somewhat reason, my default page is not shown by default.

<br/>

I checked the DNS propagations and it was done. I try visiting one of the pages in my website and it works great. But somehow when entering only the domain name, it doesn't bring up the default page. After several hours, I figured out that there is `index.html`{.bg-gray-200 .p-2 .rounded} that was put when the directory was setup. Renaming it to something other than list of default documents fix the issue.