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

const manejarRegistro = async () => {
  if (password.value.length < 6) {
    errorMensaje.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  try {
    procesando.value = true
    errorMensaje.value = ''
    await authStore.registrar(email.value, password.value)
    router.push('/')
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      errorMensaje.value = 'Este correo ya está registrado.'
    } else {
      errorMensaje.value = 'Hubo un error al crear la cuenta.'
    }
  } finally {
    procesando.value = false
  }
}
</script>

<template>
  <div class="row justify-content-center align-items-center min-vh-100">
    <div class="col-12 col-md-8 col-lg-5">
      <div class="card shadow-lg border-0" style="border-radius: 16px">
        <div class="card-body p-5 text-center">
          <i class="fa-solid fa-user-plus text-info display-4 mb-3"></i>
          <h2 class="text-white fw-bold mb-4">Crear Cuenta</h2>

          <div v-if="errorMensaje" class="alert alert-danger" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>{{ errorMensaje }}
          </div>

          <form @submit.prevent="manejarRegistro">
            <div class="mb-3 text-start">
              <label class="form-label text-custom-muted">Correo Electrónico</label>
              <input
                type="email"
                class="form-control custom-input"
                v-model="email"
                required
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="mb-4 text-start">
              <label class="form-label text-custom-muted">Contraseña (Mín. 6 caracteres)</label>
              <input
                type="password"
                class="form-control custom-input"
                v-model="password"
                required
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              class="btn btn-info w-100 mb-3 text-dark fw-bold"
              :disabled="procesando"
            >
              <span v-if="procesando" class="spinner-border spinner-border-sm me-2"></span>
              {{ procesando ? 'Registrando...' : 'Registrarme' }}
            </button>
          </form>

          <p class="text-custom-muted mt-4 mb-0">
            ¿Ya tienes una cuenta?
            <RouterLink to="/login" class="text-primary text-decoration-none fw-bold"
              >Inicia sesión</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos claros y celestes para los inputs */
input.custom-input {
  background-color: #f0f9ff !important; /* Celeste muy claro */
  border: 1px solid #bae6fd !important; /* Borde celeste intermedio */
  color: #334155 !important; /* Texto oscuro */
}

/* Efecto al hacer clic en el input */
input.custom-input:focus {
  background-color: #ffffff !important; /* Se vuelve blanco al escribir */
  border-color: #7dd3fc !important;
  box-shadow: 0 0 0 0.25rem rgba(125, 211, 252, 0.25) !important;
}

/* Ajuste del color del placeholder (texto de ayuda) */
input.custom-input::placeholder {
  color: #94a3b8 !important;
}
</style>
