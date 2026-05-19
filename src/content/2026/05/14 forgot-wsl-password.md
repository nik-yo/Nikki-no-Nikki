---
date: 2026-05-14
---

::post-title{:date="date"}
# Forgot WSL Password
::

<br/>

How to reset the password? If there's only one distribution, run `wsl -u root`{.bg-gray-200 .p-2 .rounded}

<br/>

If multiple, run `wsl -d <distro> -u root`{.bg-gray-200 .p-2 .rounded}

<br/>

Then run `passwd <username>`{.bg-gray-200 .p-2 .rounded}

<br/>

If you are not sure what your username is, usually `cat /etc/passwd`{.bg-gray-200 .p-2 .rounded} can help.

<br/>

It should then prompt for new password.