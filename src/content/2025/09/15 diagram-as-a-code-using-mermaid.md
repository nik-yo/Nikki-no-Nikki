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

<br/>

It actual does server side rendering, but since I'm not going to have a server, I need a client side rendering. Good thing is there's a workaround: [https://github.com/nuxt/content/issues/1866]{.text-blue-600}. Thank to all the folks that contribute to the solutions!

<br/>

First, we need to create a client side plugin under `<app>/plugins/mermaid.client.ts`{.bg-gray-200 .p-2 .rounded} with the following content:

::code-block
```
import mermaid from 'mermaid'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('mermaid', () => mermaid)
})
```
::

<br/>

Next, we need a custom component, let say `<app>/components/mermaid.vue`{.bg-gray-200 .p-2 .rounded}:


::code-block
```
<script setup lang="ts">
  const { $mermaid } = useNuxtApp();
  const mermaidContainer = ref<HTMLPreElement | null>(null)

  onMounted(async () => {
    const { $mermaid } = useNuxtApp();
  const mermaidContainer = ref<HTMLPreElement | null>(null)

  onMounted(async () => {
    if (mermaidContainer.value?.textContent) {
      await nextTick()
      try {
        $mermaid().initialize({ startOnLoad: false, theme: 'default' })
        await $mermaid().run({
          nodes: [mermaidContainer.value],
        })
      }
      catch (e) {
        console.error('Error running Mermaid:', e)
        mermaidContainer.value.innerHTML = '⚠️ Mermaid Chart Syntax Error'
      }
    }
  })
</script>

<template>
  <pre ref="mermaidContainer" class="mermaid">
    <slot mdc-unwrap="p" />
  </pre>
</template>
```
::

<br/>

Then, add a type to make typescript happy at `<app>/types/mermaid.d.ts`{.bg-gray-200 .p-2 .rounded}:

::code-block
```
import type { mermaid } from 'mermaid'

declare module '#app' {
  interface NuxtApp {
    $mermaid: () => mermaid
  }
}

export {}
```
::

<br/>

Finally, on the markdown:

::code-block
```

::mermaid
sequenceDiagram
    participant user as User
    participant web as Web UI
    participant api as API
    user->>web: GET /
    web->>user: return <html>
    user-->>api: GET /api/resource
    api-->>user: return {json}
::

```
::

which renders the diagram:
::mermaid-block
sequenceDiagram
    participant user as User
    participant web as Web UI
    participant api as API
    user->>web: GET /
    web->>user: return <html>
    user-->>api: GET /api/resource
    api-->>user: return {json}
::

<br/>

For more information:
[https://mermaid.js.org/]{.text-blue-600}