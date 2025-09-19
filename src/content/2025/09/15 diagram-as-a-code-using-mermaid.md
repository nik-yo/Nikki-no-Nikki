---
date: 2025-09-15
---

::post-title{:date="date"}
# Diagram as a Code Using Mermaid
::

<br />

Today I need to visualize a data flow using diagram. I started with my go-to tools, Draw.io. It's quickly getting complicated. I need to move elements around, ensure the arrows are still correct, update the formatting, and soon I can see it taking a lot of time.

<br />

I decided to use a different approach. In KCDC, there's a session about diagram and I remember the tool is Mermaid, so I decided to learn it. And within minutes, I'm able to create very dynamic sequence diagram and entity relation diagram in markdown file.

<br />

::section-title
## With Mermaid Plugin in VS Code
::

This is how I originally have it. Basically install [Mermaid plugin for VS Code](https://marketplace.visualstudio.com/items?itemName=MermaidChart.vscode-mermaid-chart){.text-blue-600}. Then on the markdown, add the following text:

::code-block
````
```mermaid
sequenceDiagram
    participant user as User
    participant web as Web UI
    participant api as API
    user->>web: GET /
    web->>user: return &lt;html&gt;
    user-->>api: GET /api/resource
    api-->>user: return {json}
```
````
::

Show preview on VS Code and the diagram will be rendered.

<br />

For more information:
[https://www.mermaidchart.com/]{.text-blue-600}

<br />

::section-title
## In Nuxt Content Markdown using NPM Package
::

For the purpose of showing the diagram in this blog, I had to approach it differently as it will be rendered as html. Instead of plugin, I installed the npm package.

::code-block
```
yarn add mermaid
```
::

Then I had to initialize it in the page that I want to render the diagram.

::code-block
```
<script lang="ts" setup>
import mermaid from 'mermaid';
mermaid.initialize({ startOnLoad: true });
</script>
```
::

Then on the markdown, I have the following syntax:

::code-block
```
<pre class="mermaid">
sequenceDiagram
    participant user as User
    participant web as Web UI
    participant api as API
    user->>web: GET /
    web->>user: return &lt;html&gt;
    user-->>api: GET /api/resource
    api-->>user: return {json}
</pre>
```
::

which renders the diagram:
<pre class="mermaid">
sequenceDiagram
    participant user as User
    participant web as Web UI
    participant api as API
    user->>web: GET /
    web->>user: return &lt;html&gt;
    user-->>api: GET /api/resource
    api-->>user: return {json}
</pre>

For more information:
[https://mermaid.js.org/]{.text-blue-600}