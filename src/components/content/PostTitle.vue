<script setup lang="ts">
const props = defineProps({
  date: {
    type: String,
    required: true
  }
})

const formattedDate = new Date(props.date).toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC"
})
</script>

<template>
  <div class="text-center mb-2">
    <h3 class="text-2xl">
      <slot />
    </h3>
    <h5>{{ formattedDate }}</h5>
  </div>
</template>