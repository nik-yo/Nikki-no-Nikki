<script setup>
const props = defineProps({ textColor: { type: String } })

const textColorClass = computed(() => {
  return props.textColor || ''
})
</script>

<template>
  <div class="bg-gray-200 p-4 rounded-md my-4 overflow-x-auto"
       :class="textColorClass">
    <slot mdc-unwrap="p"/>
  </div>
</template>