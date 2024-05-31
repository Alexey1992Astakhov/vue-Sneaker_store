<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
defineProps({
  totalPrice: Number,
  isAuthenticated: Boolean // Добавляем пропс для хранения информации об авторизации пользователя
})

const emit = defineEmits(['openDrawer', 'logout'])
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem('token') // Удаление токена из localStorage
  router.push('/auth') // Перенаправление на страницу входа после выхода
  emit('logout') // Эмитируем событие logout
}


</script>

<template>
  <header class="flex flex-col md:flex-row md:flex gap-12 justify-between border-b border-slate-100 px-4 sm:px-8 py-4 ">
    <router-link to="/">
      <div class="flex items-center gap-3">
        <img src="/my-logo.png" alt="Logo" class="w-16 h-16 sm:w-10 sm:h-10 rounded-full sm:mb-10" />
        <div>
          <h2 class="text-3xl font-bold mb-2 text-stone-700 font-serif max-lg:text-xl ">кросСКлад</h2>
          <p class="text-slate-400 text-sm sm:text-l">Самый ТОП</p>
        </div>
      </div>
    </router-link>

    <ul class="md:grid md:gap-10 md:mt-0 grid-cols-3 xl:flex items-center gap-4 mt-2">
      <router-link to="/">
        <li class="flex items-center cursor-pointer gap-4 text-gray-500 hover:text-black">
          <img src="/home.svg" alt="Home" class="w-5 sm:w-5"/>
          <span class="text-sm sm:text-base">Главная</span>
        </li>
      </router-link>
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" class="w-6 sm:w-5"/>
        <b class="text-sm sm:text-base">{{ totalPrice }}</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Favorites" class="w-6 sm:w-5"/>
          <span class="text-sm sm:text-base">Закладки</span>
        </li>
      </router-link>

      <router-link v-if="!isAuthenticated" to="/auth">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" class="w-6 sm:w-5"/>
          <span class="text-sm sm:text-base">Войти в профиль</span>
        </li>
      </router-link>

      <router-link v-else to="/profile">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" class="w-6 sm:w-5"/>
          <span class="text-sm sm:text-base">Мой профиль</span>
        </li>
      </router-link>

      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img class="w-6 sm:w-5" src="/logout.svg" alt="Logout" />
        <span class="text-sm sm:text-base">Выйти</span>
      </button>
    </ul>
  </header>
</template>
