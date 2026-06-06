# ClimaCL - Módulo 7 (Usuarios, Login y Estado Global) 🌤️

Aplicación web de pronóstico meteorológico para 10 ciudades de Chile. En esta versión, se ha implementado un sistema completo de autenticación de usuarios y protección de rutas utilizando Firebase y Pinia, cumpliendo con los requerimientos avanzados de estado global.

🔗 **Enlace al repositorio:** [https://github.com/Raulleivalobos/weather-frontend-m7](https://github.com/Raulleivalobos/weather-frontend-m7)

## 🚀 Flujo de Autenticación y Características

- **Registro e Inicio de Sesión:** Integración con **Firebase Authentication** para la gestión segura de cuentas mediante correo electrónico y contraseña.
- **Estado Global:** Sustitución del antiguo Vuex por **Pinia** para manejar el estado de la sesión, lo que permite que el usuario siga logueado incluso si recarga la página.
- **Preferencias Personalizadas:** Módulo de Pinia dedicado a gestionar las "Ciudades Favoritas" del usuario en la vista principal, permitiendo filtrar la interfaz según sus preferencias.
- **Peticiones HTTP:** Consumo de la API de Open-Meteo mediante **Axios**.

## 🛡️ Rutas Protegidas (Vue Router)

Se implementó un "Navigation Guard" (`beforeEach`) para garantizar la seguridad de la aplicación:

- `/login` y `/registro`: Rutas públicas para invitados.
- `/` (Home) y `/detalle/:id`: **Rutas privadas**. Exigen que el usuario tenga una sesión activa. Si un usuario no logueado intenta acceder a ellas, es redirigido automáticamente a la pantalla de login.

## ⚙️ Instrucciones de Ejecución

1. Clonar el repositorio:

   ```bash
   git clone [https://github.com/Raulleivalobos/weather-frontend-m7.git)

   creado por Raúl Leiva - ClimaCL
   ```
