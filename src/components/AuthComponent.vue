<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const isAuthenticated = ref(false)

const loginUser = async () => {
  errorMessage.value = ''
  try {
    if (!email.value || !password.value) {
      throw new Error('Пожалуйста, заполните все поля')
    }

    const user = {
      email: email.value,
      password: password.value
    }

    const res = await axios.post('https://c609c87379a55cb8.mokky.dev/auth', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = res.data
    console.log('Response data:', data)
    localStorage.setItem('token', data.token)
    isAuthenticated.value = true
    router.push('/') // Перенаправление на главную страницу после успешной авторизации
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Неправильный email или пароль'
    } else {
      errorMessage.value = 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.'
    }
    console.error('Ошибка при авторизации:', error.message)
  }
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 max-w-md mx-auto">
    <div class="py-12 border-1 shadow-2xl rounded-3xl">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-12 w-auto rounded-full" src="/my-logo.png" alt="my Company" />
        <h2 class="mt-10 text-center text-2xl md:text-3xl font-bold leading-9 tracking-tight text-gray-600">
          Войдите в свой аккаунт
        </h2>
        <h3 class="mt-5 text-center text-xl md:text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Нет аккаунта?
        </h3>
        <router-link to="/register">
          <div class="flex justify-center items-center gap-3">
            <img class="h-15 w-20 animate-pulse" src="/arrowUp.png" alt="arrowUp" />
            <p class="text-lg md:text-xl font-bold text-red-600 hover:text-indigo-600">
              Зарегистрироваться
            </p>
          </div>
        </router-link>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="loginUser" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"></label>
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                placeholder="Введите Email"
                required
                class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"></label>
            </div>
            <div class="mt-2 relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                placeholder="Введите пароль"
                required
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              <div @click="toggleShowPassword" class="absolute top-2 right-3 cursor-pointer">
                <img v-if="showPassword" class="h-6 w-6" src="/View.png" alt="view" />
                <img v-else class="h-5 w-6" src="/isVieww.png" alt="isview" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
      <div class="text-red-500 text-xl flex w-full justify-center mt-5">{{ errorMessage }}</div>
    </div>
  </div>
</template>