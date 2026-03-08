---
date: 2026-01-11
---

::post-title{:date="date"}
# Copying Files with Certain File Extensions using AzCopy Task in Azure DevOps 
::

::notes
This is a repost from my old blog. First posted in 6/20/2024.
::

<br/>

I was trying to copy only certain files within a directory to Azure Storage Account instead of the whole directory content.

<br/>

The files that I tried to copy are those ends with .zip, .tag.gz, and .py. AzCopy support wildcard on the source, so I would like to do something like this:

::code-block
```
azcopy copy C:\{directory}\[*.zip|*.tar.gz|*.py] ...
```
::

I found out later that there's --include-pattern option, so this works:

::code-block
```
azcopy copy C:\{directory}\* --include-pattern *.zip;*.tar.gz;*.py
```
::