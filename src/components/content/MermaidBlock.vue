<script setup lang="ts">
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
  <div class="bg-gray-200 p-4 rounded-md my-4 overflow-x-auto">
    <pre ref="mermaidContainer" class="mermaid">
      <slot mdc-unwrap="p" />
    </pre>    
  </div>
</template>