import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// datos exactos de tu consola de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAuF_GbsNAGeHxgg82Hyt4UnNxUfIMKPUk',
  authDomain: 'app-clima-vue-221c9.firebaseapp.com',
  projectId: 'app-clima-vue-221c9',
  storageBucket: 'app-clima-vue-221c9.firebasestorage.app',
  messagingSenderId: '403354683141',
  appId: '1:403354683141:web:675cd9e0ab6a7c8c74596c',
}

// Inicializamos Firebase
const app = initializeApp(firebaseConfig)

// Exportamos el servicio de Autenticación para usarlo en la app
export const auth = getAuth(app)
