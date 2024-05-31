<template>
  <div>
    <h2 class="text-3xl font-bold mb-8 text-gray-600">Список пользователей</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden sm:place-content-center">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex flex-col lg:flex-row lg:space-x-4">
                <button
                  @click="editUser(user)"
                  class="mb-2 lg:mb-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                >
                  Редактировать
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Модальное окно для редактирования пользователя -->
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-8 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Редактирование пользователя</h2>
          <form @submit.prevent="saveChanges">
            <div class="mb-4">
              <label for="edit-name" class="block font-medium">Имя:</label>
              <input
                type="text"
                id="edit-name"
                v-model="editedUser.name"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label for="edit-email" class="block font-medium">Email:</label>
              <input
                type="email"
                id="edit-email"
                v-model="editedUser.email"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label for="edit-password" class="block font-medium">Password:</label>
              <input
                type="password"
                id="edit-password"
                v-model="editedUser.password"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="flex space-x-4">
              <button
                type="submit"
                class="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Сохранить
              </button>
              <button
                @click="cancelEdit"
                class="flex justify-center items-center px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const editedUser = ref(null)
const isEditing = ref(false)

// Загрузка списка пользователей при монтировании компонента
onMounted(async () => {
  try {
    const response = await axios.get('https://c609c87379a55cb8.mokky.dev/users')
    users.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке списка пользователей:', error.message)
  }
})

// Функция для редактирования пользователя
const editUser = (user) => {
  editedUser.value = { ...user } // Копируем данные пользователя для редактирования
  isEditing.value = true // Открываем модальное окно редактирования
}

// Функция для сохранения изменений
const saveChanges = async () => {
  try {
    await axios.patch(
      `https://c609c87379a55cb8.mokky.dev/users/${editedUser.value.id}`,
      editedUser.value
    )
    // Обновляем список пользователей после успешного редактирования
    const response = await axios.get('https://c609c87379a55cb8.mokky.dev/users')
    users.value = response.data
    alert('Редактирование прошло успешно')
    isEditing.value = false // Закрываем модальное окно
  } catch (error) {
    console.error('Ошибка при сохранении изменений:', error.message)
  }
}

// Функция для отмены редактирования
const cancelEdit = () => {
  editedUser.value = null
  isEditing.value = false
}

// Функция для удаления пользователя
const deleteUser = async (userId) => {
  try {
    await axios.delete(`https://c609c87379a55cb8.mokky.dev/users/${userId}`)
    // Обновляем список пользователей после успешного удаления
    users.value = users.value.filter((user) => user.id !== userId)
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error.message)
  }
}
</script>


