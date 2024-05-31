<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="imageUrl" alt="info" class="mb-4" />
    <h3 class="text-xl font-bold">{{ title }}</h3>
    <p class="text-center">{{ description }}</p>
  </div>
</template>