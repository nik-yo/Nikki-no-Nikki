---
date: 2025-12-17
---

::post-title{:date="date"}
# Mermaid on Miro
::

<br/>

I tried to put my Mermaid code on Miro. Copy paste didn't go so well, but it eventually work with some limitations.

<br/>

It doesn't like colon. My mermaid code is for Entity Relation diagram. There's a way to easy apply style using classDef and triple colon shorthand `:::`{.bg-gray-200 .p-2 .rounded}. For example: 

::code-block
```
Entity:::primary {
  int ID PK
}

classDef primary stroke:#0000FF,stroke-width:2px
```
::

The above throws `Parse error...`{.bg-gray-200 .p-2 .rounded}

<br/>

I found out that at that time, the Mermaid version installed in Miro is 10.9 while the latest is 11.12, so maybe a lot has changed. Removing all the colons work. And I can't find styling documentation for Mermaid 10.9, so I can't apply any style. 

<br/>

Another limitation is Mermaid diagram will be rendered in Miro as an image. It is supposedly editable and it works for the template diagrams, but for my custom diagram, it lost the code somehow when I attempted to edit existing image/diagram.
