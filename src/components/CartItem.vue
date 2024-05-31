<script setup>
const emit = defineEmits(['onClickAdd', 'onClickRemove'])
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  quantity: Number
})
</script>

<template>
  <div class="flex border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2 items-center">
        <b>{{ price }} руб.</b>
        <div class="flex items-center gap-2">
          <span>{{ quantity }}</span>
          <button @click="emit('onClickAdd')" class="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
            +
          </button>
        </div>
        <img
          @click="emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>