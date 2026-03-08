---
date: 2025-12-29
---

::post-title{:date="date"}
# FTP Access Denied When Attempting to Transfer Files
::

::notes
This is a repost from my old blog. First posted in 12/8/2020.
::

<br/>

Permission is, as usual, a double-edged sword. It happened when I tried to transfer files to a remote Linux server.

<br/>

I created a directory on the remote server and attempting to transfer files via FTP client but got an access denied error. It is weird because I do login using the same account and thus as the owner of the directory.

<br/>

The one that solves the problem in my case is by changing ownership of the folder recursively (-R option) and use name of the user as group name such as:

::code-block
```
sudo chown -R <user>:<user> <directory>
```
::