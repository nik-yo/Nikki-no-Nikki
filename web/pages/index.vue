<!-- <script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
</template> -->
<script setup lang="ts">
const { data: post } = await useAsyncData(() => queryCollection('posts').order('date', 'DESC').first())
</script>

<template>
  <div>
    <ContentRenderer v-if="post" :value="post"/>
    <div v-else>Can't find a content</div>
  </div>
</template>