<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMensaje = ref('')
const procesando = ref(false)

const manejarLogin = async () => {
  try {
    procesando.value = true
    errorMensaje.value = ''
    // Llamamos a la acción de Pinia que conecta con Firebase
    await authStore.login(email.value, password.value)
    // Si es exitoso, el router nos lleva al Home
    router.push('/')
  } catch (error) {
    errorMensaje.value = 'Usuario o contraseña incorrectos.'
  } finally {
    procesando.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <video autoplay muted loop playsinline class="bg-video">
      <source src="/video/videoplayback.mp4" type="video/mp4" />
    </video>

    <div class="login-card-container">
      <div class="card shadow-lg border-0 login-card">
        <div class="card-body p-4 p-md-5 text-center">
          <i class="fa-solid fa-cloud-sun text-warning display-4 mb-3"></i>
          <h2 class="text-dark fw-bold mb-4">Iniciar Sesión</h2>

          <div v-if="errorMensaje" class="alert alert-danger" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>{{ errorMensaje }}
          </div>

          <form @submit.prevent="manejarLogin">
            <div class="mb-3 text-start">
              <label class="form-label text-dark fw-medium">Correo Electrónico</label>
              <input
                type="email"
                class="form-control custom-input"
                v-model="email"
                required
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="mb-4 text-start">
              <label class="form-label text-dark fw-medium">Contraseña</label>
              <input
                type="password"
                class="form-control custom-input"
                v-model="password"
                required
                placeholder="********"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3 fw-bold" :disabled="procesando">
              <span v-if="procesando" class="spinner-border spinner-border-sm me-2"></span>
              {{ procesando ? 'Verificando...' : 'Entrar' }}
            </button>
          </form>

          <p class="text-secondary mt-4 mb-0 fw-medium">
            ¿No tienes cuenta?
            <RouterLink to="/registro" class="text-info text-decoration-none fw-bold"
              >Regístrate aquí</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal que ocupa toda la pantalla */
.login-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Estilos para el video de fondo */
.login-wrapper .bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.6);
}

/* Contenedor que restringe el tamaño del formulario */
.login-wrapper .login-card-container {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  z-index: 1;
}

/* Transparencia suave para la tarjeta (Especificidad alta sin !important) */
.login-wrapper .card.login-card {
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

/* Estilos claros y celestes para los inputs */
.login-wrapper .form-control.custom-input {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #334155;
}

/* Efecto al hacer clic en el input */
.login-wrapper .form-control.custom-input:focus {
  background-color: #ffffff;
  border-color: #7dd3fc;
  box-shadow: 0 0 0 0.25rem rgba(125, 211, 252, 0.25);
}

/* Ajuste del color del placeholder */
.login-wrapper .form-control.custom-input::placeholder {
  color: #94a3b8;
}
</style>
