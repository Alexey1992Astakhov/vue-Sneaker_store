import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue');
const Favorites = () => import('../pages/Favorites.vue');
const AuthComponent = () => import('../components/AuthComponent.vue');
const ProfileComponent = () => import('../components/ProfileComponent.vue');
const OrdersComp = () => import('../components/OrdersComp.vue');
const RegisterComponent = () => import('../components/RegisterComponent.vue');
const NotFound = () => import('../pages/NotFound.vue');

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/register', name: 'Register', component: RegisterComponent },
    { path: '/auth', name: 'Auth', component: AuthComponent },
    { path: '/profile', name: 'Profile', component: ProfileComponent, meta: { requiresAuth: true } },
    { path: '/orders', name: 'Orders', component: OrdersComp, meta: { requiresAuth: true } },
    { path: '/404', name: 'NotFound', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});

export default router;
