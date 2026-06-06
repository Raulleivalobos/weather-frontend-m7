# ClimaCL - Plataforma Meteorológica 🌤️ (Módulo 7)

Aplicación web de pronóstico meteorológico para 10 ciudades de Chile. Esta versión integra un sistema completo de autenticación, protección de rutas y consumo de APIs mediante Axios, gestionando el estado global con Pinia.

## 🔗 Enlace al Repositorio

**GitHub:** [https://github.com/Raulleivalobos/weather-frontend-m7](https://github.com/Raulleivalobos/weather-frontend-m7)

---

## 👤 Sistema de Usuarios

El proyecto utiliza **Firebase Authentication** para gestionar el registro y acceso de forma segura. De cada usuario se guarda y gestiona la siguiente información:

- **Credenciales de Acceso:** Correo electrónico y contraseña (encriptada y gestionada de forma segura en los servidores de Firebase).
- **Identificador Único (UID):** Un token seguro generado por Firebase para identificar la sesión.
- **Estado Local (Pinia):** Durante la sesión, la tienda de Pinia almacena el correo del usuario logueado para mostrarlo en la interfaz y un arreglo numérico con los **IDs de sus ciudades favoritas** para mantener sus preferencias visuales de filtrado.

---

## 🛣️ Rutas y Autenticación (Vue Router)

El sistema cuenta con rutas protegidas mediante _Navigation Guards_ (`beforeEach`) para garantizar que solo los usuarios registrados puedan acceder a la información meteorológica:

**Rutas Públicas:**

- `/login` : Vista para que los usuarios existentes inicien sesión.
- `/registro` : Vista con el formulario para crear una cuenta nueva.

**Rutas Privadas (Requieren Autenticación):**

- `/` (Home) : Panel principal donde se listan las 10 ciudades de Chile. Permite buscar por texto y filtrar por las ciudades marcadas como favoritas.
- `/detalle/:id` : Vista de pronóstico extendido semanal con estadísticas de temperaturas máximas/mínimas y avisos meteorológicos basados en las condiciones.
  _(Si un usuario no logueado intenta acceder a estas rutas, es redirigido automáticamente al `/login`)._

---

## ⚙️ Instrucciones de Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. Clonar el repositorio:

```bash
   git clone [https://github.com/Raulleivalobos/weather-frontend-m7.git](https://github.com/Raulleivalobos/weather-frontend-m7.git).

2. Navegar a la carpeta del proyecto:

cd weather-frontend-m7

3. Instalar las dependencias:

Se recomienda utilizar pnpm para instalar los paquetes necesarios (Vue, Vue Router, Pinia, Axios, Firebase).

pnpm install

4. Levantar el servidor de desarrollo

pnpm dev

El proyecto estará disponible en tu navegador, generalmente en http://localhost:5173.

Desarrollado por Raúl Leiva Lobos - 2026
```
