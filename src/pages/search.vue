<script setup lang="ts">
import MiniSearch from 'minisearch'

interface Document {
  id: number;
  title: string;
  category: string;
}

const router = useRouter()

const query = ref('')
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('posts'))

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

// Add data to the MiniSearch instance
if (data.value) {
  miniSearch.addAll(toValue(data.value))
}

const result = computed(() => miniSearch.search(toValue(query)))
</script>

<template>
  <div class="flex flex-col h-full gap-4">
    <div><button @click="$router.back()" class="text-blue-600 cursor-pointer">Back</button></div>
    <div class="border border-gray-400 rounded-lg p-2">
      <input v-model="query" type="text" placeholder="Search..." class="w-full outline-none" />  
    </div>
    <div class="overflow-auto">
      <ul>
        <li v-for="link of result" :key="link.id" class="mt-2">
          <NuxtLink :to="link.id">
            <div class="text-blue-500">{{ link.title.substring(3) }}</div>
            <p class="text-gray-600 text-xs line-clamp-3">{{ link.content }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>