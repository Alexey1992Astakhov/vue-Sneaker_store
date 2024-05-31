<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Список заказов</h2>
    <ul>
      <li v-for="order in orders" :key="order.id" class="mb-4">
        <div class="border-b border-gray-300 pb-4">
          <p class="font-bold">Заказ {{ order.id }}:</p>
          <ul class="ml-4">
            <li v-for="item in order.items" :key="item.id" class="mb-2">
              {{ item.title }} - {{ item.price }} ₽
            </li>
          </ul>
          <p class="font-bold">Общая стоимость: {{ order.totalPrice }} ₽</p>
          <template v-if="order.user">
            <p>Пользователь: {{ order.user.name }} ({{ order.user.email }})</p>
          </template>
          <template v-else>
            <p>Пользователь не найден</p>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const orders = ref([]);

// Функция для получения данных о заказах и связанных с ними пользователях
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Вы не авторизованы');
    }

    // Запрос на получение всех заказов
    const ordersResponse = await axios.get('https://c609c87379a55cb8.mokky.dev/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const fetchedOrders = ordersResponse.data;

    // Обновление данных
    orders.value = fetchedOrders;
  } catch (error) {
    console.error('Ошибка при получении данных:', error.message);
  }
};

onMounted(fetchOrders);
</script>