<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('posts').path(route.path).first()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div><NuxtLink to="/posts" class="text-blue-600">Back to posts</NuxtLink></div>
    <div class="overflow-auto">
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </div>
</template>
