<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('posts').path(route.path).first()
})

useSeoMeta(post.value?.seo || {})
</script>

<template>
  <div class="flex flex-col h-full">
    <div><button @click="$router.back()" class="text-blue-600 cursor-pointer">Back</button></div>
    <div class="overflow-auto">
      <ContentRenderer v-if="post" :value="post" />
    </div>
  </div>
</template>
