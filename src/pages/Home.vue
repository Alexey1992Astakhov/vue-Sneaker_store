<template>
  <div class="mb-10 max-sm:mb-0">
    <img class="w-full h-48 max-sm:hidden md:h-80 lg:h-96" src="/kross-banner.png" alt="" />
  </div>
  <div class="flex flex-col md:flex-row justify-between items-center">
    <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-600 max-xl:w-40">Все Кроссовки</h2>
    <div class="flex flex-col sm:flex-row gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none max-xl:w-40">
        <option value="title">По названию</option>
        <option value="price">По цене (сначала дешевые)</option>
        <option value="-price">По цене (сначала дорогие)</option>
      </select>
      <div class="relative mt-4 sm:mt-0">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 max-xl:w-40"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
  <div class="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4">
    <button
      @click="prevPage"
      :disabled="meta.current_page === 1"
      class="px-4 py-2 mx-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed max-sm:hidden"
    >
      Предыдущая
    </button>
    <span class="mx-4 max-sm:hidden">Страница {{ meta.current_page }} из {{ meta.total_pages }}</span>
    <button
      @click="nextPage"
      :disabled="meta.current_page === meta.total_pages"
      class="px-4 py-2 mx-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed max-sm:hidden"
    >
      Следующая
    </button>
  </div>
  <div class="flex justify-center items-center mt-10">
    <button
      @click="loadMore"
      :disabled="meta.current_page === meta.total_pages"
      class="px-4 py-2 mx-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      Ещё
    </button>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import debounce from 'lodash.debounce'
import axios from 'axios'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])
const meta = ref({
  total_items: 0,
  total_pages: 1,
  current_page: 1,
  per_page: 4,
  remaining_count: 0,
})

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
    item.isAdded = true
  } else {
    removeFromCart(item)
    item.isAdded = false
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 1000)

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://c609c87379a55cb8.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://c609c87379a55cb8.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fecthFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://c609c87379a55cb8.mokky.dev/favorites`)

    favorites.forEach(favorite => {
      const item = items.value.find(i => i.id === favorite.item_id)
      if (item) {
        item.isFavorite = true
        item.favoriteId = favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async (page = 1, resetItems = true) => {
  try {
    const params = {
      sortBy: filters.sortBy,
      page,
      limit: meta.value.per_page
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://c609c87379a55cb8.mokky.dev/items`, {
      params
    })

    const newItems = data.items.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: cart.value.some((cartItem) => cartItem.id === obj.id)
    }))

    if (resetItems) {
      items.value = newItems
    } else {
      items.value.push(...newItems)
    }

    meta.value = data.meta
    await fecthFavorites()
  } catch (err) {
    console.log(err)
  }
}

const loadMore = () => {
  if (meta.value.current_page < meta.value.total_pages) {
    fetchItems(meta.value.current_page + 1, false)
    meta.value.current_page += 1
  }
}

const nextPage = () => {
  if (meta.value.current_page < meta.value.total_pages) {
    meta.value.current_page += 1
    fetchItems(meta.value.current_page)
  }
}

const prevPage = () => {
  if (meta.value.current_page > 1) {
    meta.value.current_page -= 1
    fetchItems(meta.value.current_page)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems() // Запрос на все кроссовки
})

watch(filters, () => fetchItems(1))

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>