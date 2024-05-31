<script setup>
import { defineProps, defineEmits } from 'vue'
import CardComponent from './CardComponent.vue';

defineProps({
  items: Array,
})

const emit = defineEmits(['add-to-favorite', 'add-to-cart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-6 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4" v-auto-animate>
    <CardComponent
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      @click-favorite="() => emit('add-to-favorite', item)"
      @click-add="() => emit('add-to-cart', item)"
    />
  </div>
</template>
