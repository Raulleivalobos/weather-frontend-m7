import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

// Importar CSS de Bootstrap y FontAwesome
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Esperamos a que Firebase verifique si hay un usuario logueado antes de dibujar la app
const authStore = useAuthStore()
authStore.inicializarAuth().then(() => {
  app.mount('#app')
})
