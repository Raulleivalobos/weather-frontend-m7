import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  // --- ESTADO ---
  const usuario = ref(null)
  const cargando = ref(true)
  const error = ref(null)

  // --- ACCIONES ---

  // 1. Registrar un nuevo usuario
  const registrar = async (email, password) => {
    try {
      error.value = null
      const credencial = await createUserWithEmailAndPassword(auth, email, password)
      usuario.value = credencial.user
    } catch (e) {
      error.value = 'Error al registrar: ' + e.message
      throw e
    }
  }

  // 2. Iniciar sesión
  const login = async (email, password) => {
    try {
      error.value = null
      const credencial = await signInWithEmailAndPassword(auth, email, password)
      usuario.value = credencial.user
    } catch (e) {
      error.value = 'Usuario o contraseña incorrectos'
      throw e
    }
  }

  // 3. Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      usuario.value = null
    } catch (e) {
      console.error('Error al cerrar sesión', e)
    }
  }

  // 4. Observador de estado de Firebase (mantiene la sesión si recargas la página)
  const inicializarAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        usuario.value = user
        cargando.value = false
        resolve()
      })
    })
  }

  return {
    usuario,
    cargando,
    error,
    registrar,
    login,
    logout,
    inicializarAuth,
  }
})
