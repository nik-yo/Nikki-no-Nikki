<script setup lang="ts">
const props = defineProps({
  date: {
    type: Date,
    required: true
  }
})

const formattedDate = new Date(props.date).toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})
</script>

<template>
  <div class="text-center">
    <h3 class="text-xl mt-2">
      <slot />
    </h3>
    <h5>{{ formattedDate }}</h5>
  </div>
</template>