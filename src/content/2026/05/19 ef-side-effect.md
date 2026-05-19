---
date: 2026-05-19
---

::post-title{:date="date"}
# EF Side Effect
::

<br/>

I happened to find a side effect of Entity Framework that caused a confusion. Thanks to Claude Sonnet (AI) that I managed to understand what's going on.

<br/>

It started with the following example structure. Let say:

::code-block
```
Blog (ID: 1)
  - Post 1 (ID: 2)
  - Post 2 (ID: 3)
```

<br/>

I need to copy the structure as a new structure, but without Post 2, so the first step is set the ID to be 0. That will trigger EF to treat them as new object and thus will perform an insert.

::code-block
```
Blog (ID: 0)
  - Post 1 (ID: 0)
  - Post 2 (ID: 0)
```

<br/>

Then, I removed Post 2 and perform a SaveAsync(), so it is expected to be:

::code-block
```
Blog (ID: 1)
  - Post 1 (ID: 2)
  - Post 2 (ID: 3)

Blog (ID: 5)
  - Post 1 (ID: 6)
```

<br/>

Instead, what happened was, it became the following. Noticed that the original Post 2 became the child of the new Blog.

::code-block
```
Blog (ID: 1)
  - Post 1 (ID: 2)

Blog (ID: 5)
  - Post 1 (ID: 6)
  - Post 2 (ID: 3)
```

<br/>

What happened was, during setting ID to 0, EF tracks Post 2 and found out that it has changed. Remove Post 2 from memory doesn't detach it (an entity) from the tracker. And thus, in EF, it thought Post 2 needs to be updated instead.

<br/>

::code-block
```
class Blog
{
  List<Post> Posts { get; set; }
}

blog.Posts.Remove(post2); // This will not detach it from tracker.
```

<br/>

The solution is to reset the ID after removal. So, first we perform removal, so EF doesn't think Post 2 has changed and then reset the ID.

<br/>

Remove Post 2 first:

::code-block
```
Blog (ID: 1)
  - Post 1 (ID: 2)
```

<br/>

Then reset the ID:

::code-block
```
Blog (ID: 0)
  - Post 1 (ID: 0)
```

<br/>

That way, EF will insert the blog as new entity along with Post 1, but leaving Post 2 alone since in the tracker, it hasn't changed.