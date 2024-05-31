<script setup>
import { ref, provide, watch, computed } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import DrawerComponent from './components/DrawerComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const isAuthenticated = ref(localStorage.getItem('token') !== null)
const handleLogout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
}
// Проверка аутентификации из локального хранилища
const checkAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token')
  isAuthenticated.value = !!token
}

// Вызываем функцию для проверки аутентификации при загрузке компонент
checkAuthFromLocalStorage()

/* Корзина(START) */
const cart = ref([])


const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
/* Корзина(END) */
</script>

<template>
  <DrawerComponent v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent
      :isAuthenticated="isAuthenticated"
      :total-price="totalPrice"
      @open-drawer="openDrawer"
      @logout="handleLogout"
    />
    <div class="p-10">
      <router-view></router-view>
      <FooterComponent/>
    </div>
  </div>
</template>
