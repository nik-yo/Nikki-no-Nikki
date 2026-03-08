---
date: 2026-01-26
---

::post-title{:date="date"}
# WordPress Create Block Theme Plugin
::

::notes
This is a repost from my old blog. First posted in 9/12/2024.
::

<br/>

I'm working on a custom WordPress theme and I saw a very helpful plugin called "Create Block Theme" which is supposed to help developer create the theme.

<br/>

So, for starting, I tried to edit one of my templates, but when I hit "Save Changes" under "Save Changes to Theme" section, I expected it to overwrite my template html file, but it didn't. I was checking permissions and potential bugs, but seems like everything is good.

<br/>

After playing around a little, apparently, I need to hit "Save" first, so it records the customization in the database and then click the "Save Changes to Theme" will use the value from the database and modified the html file itself.
