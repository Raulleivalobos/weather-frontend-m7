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
      <div class="card shadow-lg border-0" style="background-color: #1b222d; border-radius: 12px">
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
                class="form-control custom-input-bg text-white border-secondary"
                v-model="email"
                required
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="mb-4 text-start">
              <label class="form-label text-custom-muted">Contraseña (Mín. 6 caracteres)</label>
              <input
                type="password"
                class="form-control custom-input-bg text-white border-secondary"
                v-model="password"
                required
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              class="btn btn-info w-100 mb-3 text-white fw-bold"
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
label.text-custom-muted,
p.text-custom-muted {
  color: #9ca3af;
}

input.form-control.custom-input-bg {
  background-color: #151b24;
}

input.form-control.custom-input-bg:focus {
  background-color: #151b24;
  color: white;
  border-color: #0dcaf0;
  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25);
}
</style>
