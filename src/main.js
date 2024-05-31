import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import router from './router'
import { cartContext } from './cartContext'



const app = createApp(App)

app.provide('cart', cartContext)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
