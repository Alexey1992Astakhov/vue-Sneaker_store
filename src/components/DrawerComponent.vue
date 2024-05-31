<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import infoBlock from './infoBlock.vue'
import axios from 'axios'
import { ref, inject, computed } from 'vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  userId: Number
})

const { cart } = inject('cart')
const isCreatingOrder = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Вы не авторизованы')
    }
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://c609c87379a55cb8.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice,
      user_id: props.userId // Передаем user_id при создании заказа
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="cartIsEmpty" class="flex h-full items-center">
      <infoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <infoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId}скоро будет передан в службу доставки`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ props.totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ props.vatPrice }} ₽</b>
        </div>

        <router-link to="/orders">
          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 disabled:bg-slate-300 text-white hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          >
            Оформить заказ
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>