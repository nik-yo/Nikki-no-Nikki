---
date: 2025-12-22
---

::post-title{:date="date"}
# Mermaid Zoomable Previewer in VS Code
::

<br/>

Up to this point, I had my diagram in a regular markdown file. The problem is when the diagram got bigger, the previewer can't zoom in. Reading the extension doc, it does support pan and zoom. However, I wasn't able to access that feature.

<br/>

After playing around a little, I figured out the way to do it. The previewer supports only `.mmd`{.bg-gray-200 .p-2 .rounded} file. So, here are the steps I did:

1. Move mermaid diagram to mmd file.
2. Open the mmd file in VS code.
3. Click `CTRL + Shift + P`{.bg-gray-200 .p-2 .rounded} and search for **MermaidChart: PreviewDiagram**

<br/>

By default, it has no key binding, so I bind mine to `ALT + SHIFT + M` for quick access.
