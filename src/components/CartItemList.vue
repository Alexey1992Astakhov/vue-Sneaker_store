<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart, addToCart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :quantity="item.quantity"
      :image-url="item.imageUrl"
      @onClickAdd="() => addToCart(item)"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
