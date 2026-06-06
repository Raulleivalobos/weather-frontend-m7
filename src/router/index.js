import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // Esta etiqueta indica que la ruta está protegida
      meta: { requiresAuth: true },
    },
    {
      path: '/detalle/:id',
      name: 'detalle',
      component: DetailView,
      meta: { requiresAuth: true },
    },
  ],
})

// GUARDIA DE NAVEGACIÓN: Se ejecuta antes de cada cambio de página
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const usuarioLogueado = authStore.usuario

  // Si la ruta requiere autenticación y NO hay usuario, lo enviamos al login
  if (to.meta.requiresAuth && !usuarioLogueado) {
    next('/login')
  }
  // Si ya está logueado e intenta ir al login o registro, lo enviamos al Home
  else if ((to.name === 'login' || to.name === 'registro') && usuarioLogueado) {
    next('/')
  }
  // En cualquier otro caso, lo dejamos pasar
  else {
    next()
  }
})

export default router
