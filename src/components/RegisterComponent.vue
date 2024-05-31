<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const name = ref('')
const showPassword = ref(false)
const showPasswordRepeat = ref(false)
const repeatPassword = ref('')
const rememberMe = ref(localStorage.getItem('rememberMe') === 'true')

const validatePasswordRepeat = (password, repeatPassword) => {
  return password === repeatPassword
}

const regUser = async () => {
  try {
    if (!email.value || !password.value || !name.value) {
      throw new Error('Пожалуйста, заполните все поля')
    }
    if (!validatePasswordRepeat(password.value, repeatPassword.value)) {
      alert('Пароли не совпадают!')
      return
    }
    const user = {
      name: name.value,
      email: email.value,
      password: password.value
    }

    if (rememberMe.value) {
      localStorage.setItem('name', name.value)
      localStorage.setItem('email', email.value)
      localStorage.setItem('password', password.value)
      localStorage.setItem('rememberMe', 'true')
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }

    const res = await axios.post('https://c609c87379a55cb8.mokky.dev/register', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const data = res.data
    localStorage.setItem('token', data.token)
    console.log(data)
    router.push('/auth')
    alert('Регистрация прошла успешно! Теперь вы можете войти в свой аккаунт.')
  } catch (error) {
    console.error('Ошибка при регистрации:', error.message)
    alert('Ошибка при регистрации: ' + error.message)
  }
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const toggleShowPasswordRepeat = () => {
  showPasswordRepeat.value = !showPasswordRepeat.value
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:max-w-2xl">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto rounded-full" src="/my-logo.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-600">
          Регистрация
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form class="space-y-6 mx-1" @submit.prevent="regUser">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Имя:</label>
            <div class="mt-2">
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                placeholder="Введите имя"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                placeholder="Введите email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль:</label>
            </div>
            <div class="mt-2 relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                placeholder="Введите пароль"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              <div @click="toggleShowPassword" class="absolute top-2 right-3 cursor-pointer">
                <img v-if="showPassword" class="h-6 w-6" src="/View.png" alt="view" />
                <img v-else class="h-5 w-6" src="/isVieww.png" alt="isview" />
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="repeatPassword" class="block text-sm font-medium leading-6 text-gray-900">Повторите пароль:</label>
            </div>
            <div class="mt-2 relative">
              <input
                v-model="repeatPassword"
                :type="showPasswordRepeat ? 'text' : 'password'"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Повторите пароль"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
              />
              <div @click="toggleShowPasswordRepeat" class="absolute top-2 right-3 cursor-pointer">
                <img v-if="showPasswordRepeat" class="h-6 w-6" src="/View.png" alt="view" />
                <img v-else class="h-5 w-6" src="/isVieww.png" alt="isview" />
              </div>
            </div>
          </div>

          <div>
            <label for="remember-me" class="block text-sm font-medium leading-6 text-gray-900">Запомнить меня</label>
            <div class="mt-2 flex items-center">
              <input
                v-model="rememberMe"
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Запомнить меня</label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>