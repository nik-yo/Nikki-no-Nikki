---
date: 2025-11-01
---

::post-title{:date="date"}
# Remove Git SSH Key Passphrase
::

<br/>

Long story short, the passphrase is getting annoying especially for my personal project. So, I'm removing it with the command:

::code-block
```
ssh-keygen -p -f /path_to_private_key
```
::

<br/>

Usually the private key is located under **`%USERPROFILE%/.ssh`** folder in Windows. In my case, it is **`%USERPROFILE%/.ssh/id_ed25519`**, so using powershell:

::code-block
```
ssh-keygen -p -f $env:USERPROFILE/.ssh/id_ed25519
```
::