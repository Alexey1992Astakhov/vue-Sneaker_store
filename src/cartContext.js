import { ref } from 'vue'

export const cartContext = {
  cart: ref([]),
  addToCart(item) {
    const found = this.cart.value.find(cartItem => cartItem.id === item.id)
    if (found) {
      found.quantity++
    } else {
      this.cart.value.push({ ...item, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(this.cart.value))
  },
  removeFromCart(item) {
    this.cart.value = this.cart.value.filter(cartItem => cartItem.id !== item.id)
    localStorage.setItem('cart', JSON.stringify(this.cart.value))
  },
  closeDrawer() {
    this.drawerOpen.value = false
  }
}
