<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const manejarLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div v-if="!authStore.cargando" id="app-container">
    <header class="py-3 shadow-sm mb-4 sticky-top bg-weather-blue" style="z-index: 1050">
      <div class="container d-flex justify-content-between align-items-center">
        <RouterLink to="/" class="text-decoration-none">
          <h1 class="h4 text-white m-0 d-flex align-items-center fw-bold">
            <i class="fa-solid fa-cloud-sun text-warning me-2 fs-3"></i>
            Clima<span style="color: #a5d8ff">CL</span>
          </h1>
        </RouterLink>

        <nav class="d-flex align-items-center gap-3">
          <template v-if="authStore.usuario">
            <span class="text-light d-none d-md-inline fw-medium">
              <i class="fa-solid fa-user-circle me-1"></i>
              {{ authStore.usuario.email }}
            </span>
            <RouterLink to="/" class="btn btn-outline-light btn-sm fw-bold">Inicio</RouterLink>
            <button @click="manejarLogout" class="btn btn-danger btn-sm fw-bold shadow-sm">
              <i class="fa-solid fa-right-from-bracket me-1"></i>Salir
            </button>
          </template>

          <template v-else>
            <RouterLink
              v-if="$route.name !== 'login'"
              to="/login"
              class="btn btn-outline-light btn-sm fw-bold"
            >
              Iniciar Sesión
            </RouterLink>
            <RouterLink
              v-if="$route.name !== 'registro'"
              to="/registro"
              class="btn btn-warning btn-sm fw-bold text-dark shadow-sm"
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

    <footer class="text-center py-4 mt-auto bg-weather-footer">
      <div class="container">
        <p class="mb-0 fw-medium text-dark-blue">
          © 2026 ClimaCL - Desarrollado por Raúl Leiva Lobos
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* CSS Global - Tonos Celeste */
body {
  background-color: #e0f2fe; /* Celeste claro para toda la página */
  color: #334155;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header.bg-weather-blue {
  background-color: #005aa3;
}

/* Nuevos colores para el footer */
.bg-weather-footer {
  background-color: #7dd3fc; /* Celeste sólido */
}

.text-dark-blue {
  color: #0c4a6e; /* Azul oscuro para que el texto resalte sobre el celeste */
}
</style>
