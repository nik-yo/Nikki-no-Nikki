<script setup lang="ts">
// const { data: posts } = await useAsyncData(() => queryCollection('posts').order('date', 'DESC').all())
const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('posts').order('date', 'DESC')
})
</script>

<template>
  <div><h3 class="text-xl my-2 mx-4">Posts</h3></div>
  <nav>
    <ul v-if="data">
      <li v-for="year in data" :key="year.path">
        <ul v-if="year.children && year.children.length">
          <li v-for="month in year.children" :key="month.path" class="ml-4">
            {{ year.title }}/{{ month.title }}
            <ul class="list-disc ml-2">
              <li v-for="post in month.children?.sort((a,b) => parseInt(b.title.substring(0,2)) - parseInt(a.title.substring(0,2)))" :key="post.path" class="ml-4">
                {{ post.title.substring(0,2) }}: <NuxtLink :to="post.path" class="text-blue-600">{{ post.title.substring(3) }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>