<script setup lang="ts">
useHead({
  title: 'Nikki no Nikki',
  meta: [
    { name: 'description', content: 'Nikki\' diary.' }
  ],
  script: [ 
    { 
      defer: true,
      src: 'https://cloud.umami.is/script.js', 
      'data-website-id': '4188cb71-1e7f-48dc-9d95-1e4943024dcf'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
