<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const manejarLogout = async () => {
  await authStore.logout()
  // Una vez cerrada la sesión, lo expulsamos de vuelta al login
  router.push('/login')
}
</script>

<template>
  <!-- Solo mostramos el Navbar y Footer si NO estamos en estado de "cargando" la sesión inicial -->
  <div v-if="!authStore.cargando" id="app-container">
    <header class="bg-dark py-3 shadow-sm mb-4 sticky-top" style="z-index: 1050">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- LOGO (Siempre visible) -->
        <RouterLink to="/" class="text-decoration-none">
          <h1 class="h4 text-white m-0 d-flex align-items-center">
            <i class="fa-solid fa-cloud-sun text-warning me-2 fs-3"></i>
            Clima<span class="text-primary">CL</span>
          </h1>
        </RouterLink>

        <!-- NAVEGACIÓN DINÁMICA -->
        <nav class="d-flex align-items-center gap-3">
          <!-- Si el usuario ESTÁ logueado -->
          <template v-if="authStore.usuario">
            <span class="text-custom-muted d-none d-md-inline">
              <i class="fa-solid fa-user text-info me-1"></i>
              {{ authStore.usuario.email }}
            </span>
            <RouterLink to="/" class="btn btn-outline-light btn-sm">Inicio</RouterLink>
            <button @click="manejarLogout" class="btn btn-danger btn-sm">
              <i class="fa-solid fa-right-from-bracket me-1"></i>Salir
            </button>
          </template>

          <!-- Si el usuario NO está logueado -->
          <template v-else>
            <RouterLink
              v-if="$route.name !== 'login'"
              to="/login"
              class="btn btn-outline-info btn-sm"
            >
              Iniciar Sesión
            </RouterLink>

            <RouterLink
              v-if="$route.name !== 'registro'"
              to="/registro"
              class="btn btn-primary btn-sm"
            >
              Registrarse
            </RouterLink>
          </template>
        </nav>
      </div>
    </header>

    <main class="container mb-5 flex-grow-1">
      <RouterView />
    </main>

    <footer class="bg-dark text-white text-center py-4 mt-auto">
      <div class="container">
        <p class="mb-0">© 2026 ClimaCL - Desarrollado por Raúl Leiva Lobos</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* CSS Global */
body {
  background-color: #0f172a;
  color: #f8f9fa;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.text-custom-muted {
  color: #9ca3af;
}
</style>
