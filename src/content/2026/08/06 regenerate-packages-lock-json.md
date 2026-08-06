---
date: 2026-08-06
---

::post-title{:date="date"}
# Regenerate packages.lock.json
::

<br/>

On my dev day today, I had to merge from main to my feature branch. Apparently a lot of packages have changed and even the .NET version is updated. And of course, I had to deal with merge conflict. 

<br/>

After resolving the conflict, somehow one of the projects were not able to access the transitive library. I figured out that it's because the packages.lock.json is no longer in-sync.

<br/>

I eventually found a way to regenerate it using the following command:

::code-block
```
dotnet restore --force-evaluate
```
::
