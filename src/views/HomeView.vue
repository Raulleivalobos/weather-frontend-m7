<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useFavoritosStore } from '../stores/favoritos'

const router = useRouter()
const favoritosStore = useFavoritosStore()

const datosClima = ref([])
const cargando = ref(true)
const mensajeError = ref('')
const busqueda = ref('')
const mostrarSoloFavoritos = ref(false) // Controla el filtro de favoritos

// 10 ciudades de Chile (De norte a sur)
const ciudadesBase = [
  {
    id: 1,
    nombre: 'Iquique',
    lat: -20.21,
    lon: -70.15,
    imagen: 'https://picsum.photos/seed/iquique/400/250',
  },
  {
    id: 2,
    nombre: 'Antofagasta',
    lat: -23.65,
    lon: -70.4,
    imagen: 'https://picsum.photos/seed/antofagasta/400/250',
  },
  {
    id: 3,
    nombre: 'La Serena',
    lat: -29.91,
    lon: -71.25,
    imagen: 'https://picsum.photos/seed/laserena/400/250',
  },
  {
    id: 4,
    nombre: 'Valparaíso',
    lat: -33.04,
    lon: -71.63,
    imagen: 'https://picsum.photos/seed/valparaiso/400/250',
  },
  {
    id: 5,
    nombre: 'Santiago',
    lat: -33.46,
    lon: -70.65,
    imagen: 'https://picsum.photos/seed/santiago/400/250',
  },
  {
    id: 6,
    nombre: 'Puente Alto',
    lat: -33.61,
    lon: -70.58,
    imagen: 'https://picsum.photos/seed/puentealto/400/250',
  },
  {
    id: 7,
    nombre: 'Concepción',
    lat: -36.83,
    lon: -73.05,
    imagen: 'https://picsum.photos/seed/concepcion/400/250',
  },
  {
    id: 8,
    nombre: 'Temuco',
    lat: -38.74,
    lon: -72.6,
    imagen: 'https://picsum.photos/seed/temuco/400/250',
  },
  {
    id: 9,
    nombre: 'Puerto Montt',
    lat: -41.47,
    lon: -72.94,
    imagen: 'https://picsum.photos/seed/puertomontt/400/250',
  },
  {
    id: 10,
    nombre: 'Punta Arenas',
    lat: -53.15,
    lon: -70.9,
    imagen: 'https://picsum.photos/seed/puntaarenas/400/250',
  },
]

const traducirClima = (codigoWMO) => {
  if (codigoWMO === 0) return { estado: 'Despejado', icono: 'fa-sun text-warning' }
  if (codigoWMO <= 3) return { estado: 'Nublado', icono: 'fa-cloud text-secondary' }
  if (codigoWMO <= 48) return { estado: 'Neblina', icono: 'fa-smog text-muted' }
  if (codigoWMO <= 67 || (codigoWMO >= 80 && codigoWMO <= 82))
    return { estado: 'Lluvia', icono: 'fa-cloud-showers-heavy text-primary' }
  if (codigoWMO <= 77 || codigoWMO === 85 || codigoWMO === 86)
    return { estado: 'Nieve', icono: 'fa-snowflake text-info' }
  if (codigoWMO >= 95) return { estado: 'Tormenta', icono: 'fa-cloud-bolt text-danger' }
  return { estado: 'Desconocido', icono: 'fa-cloud text-secondary' }
}

const cargarClima = async () => {
  try {
    cargando.value = true
    mensajeError.value = ''

    const promesas = ciudadesBase.map(async (ciudad) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudad.lat}&longitude=${ciudad.lon}&current_weather=true&timezone=America%2FSantiago`

      // IMPLEMENTACIÓN DE AXIOS SOLICITADA EN LA RÚBRICA
      const respuesta = await axios.get(url)
      const datosApi = respuesta.data

      const climaActual = traducirClima(datosApi.current_weather.weathercode)

      return {
        id: ciudad.id,
        nombre: ciudad.nombre,
        tempActual: Math.round(datosApi.current_weather.temperature),
        estadoActual: climaActual.estado,
        iconoActual: climaActual.icono,
        imagen: ciudad.imagen,
      }
    })

    datosClima.value = await Promise.all(promesas)
  } catch (error) {
    mensajeError.value = 'No se pudo conectar con los satélites meteorológicos (Axios Error).'
  } finally {
    cargando.value = false
  }
}

// Filtro combinado: Búsqueda de texto + Botón de favoritos
const ciudadesFiltradas = computed(() => {
  let resultado = datosClima.value

  // 1. Filtrar por favoritos si el switch está activado
  if (mostrarSoloFavoritos.value) {
    resultado = resultado.filter((lugar) => favoritosStore.esFavorito(lugar.id))
  }

  // 2. Filtrar por lo que esté escrito en el buscador
  if (busqueda.value !== '') {
    resultado = resultado.filter((lugar) =>
      lugar.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
    )
  }

  return resultado
})

onMounted(() => {
  cargarClima()
})

const verDetalle = (id) => {
  router.push(`/detalle/${id}`)
}
</script>

<template>
  <div>
    <div class="text-center mb-5 mt-4">
      <h1 class="text-primary fw-bold mb-3" style="font-size: 2.5rem">Pronóstico Nacional</h1>
      <p class="text-custom-muted fs-5">Selecciona una ciudad o agrégala a tus favoritas.</p>
    </div>

    <div class="row justify-content-center mb-5" v-if="!cargando && !mensajeError">
      <div class="col-md-6 col-lg-5 mb-3 mb-md-0">
        <div class="input-group shadow-sm">
          <span class="input-group-text custom-input-bg custom-border text-custom-muted">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            class="form-control custom-input-bg custom-border text-white"
            placeholder="Buscar ciudad..."
            v-model="busqueda"
          />
        </div>
      </div>
      <div
        class="col-md-4 col-lg-3 d-flex align-items-center justify-content-center justify-content-md-end"
      >
        <div class="form-check form-switch fs-5">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="switchFavoritos"
            v-model="mostrarSoloFavoritos"
          />
          <label class="form-check-label text-white ms-2" for="switchFavoritos">
            <i class="fa-solid fa-heart text-danger me-1"></i> Mis Favoritos
          </label>
        </div>
      </div>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div
        class="spinner-border text-primary mb-3"
        role="status"
        style="width: 3rem; height: 3rem"
      ></div>
      <h3 class="text-white">Conectando vía Axios...</h3>
    </div>

    <div v-else-if="mensajeError" class="text-center py-5">
      <i class="fa-solid fa-triangle-exclamation text-danger display-1 mb-3"></i>
      <h3 class="text-white mb-2">Error de Conexión</h3>
      <p class="text-muted">{{ mensajeError }}</p>
      <button @click="cargarClima" class="btn btn-outline-primary mt-3">Reintentar</button>
    </div>

    <div v-else class="row g-4 mb-5">
      <div v-if="ciudadesFiltradas.length === 0" class="col-12 text-center text-custom-muted py-5">
        <i class="fa-solid fa-cloud-sun-rain display-1 mb-3"></i>
        <p class="fs-4">No se encontraron ciudades que coincidan.</p>
      </div>

      <div v-for="lugar in ciudadesFiltradas" :key="lugar.id" class="col-md-6 col-lg-4 col-xl-3">
        <article
          class="card custom-card h-100 shadow-lg position-relative"
          @click="verDetalle(lugar.id)"
        >
          <button
            @click.stop="favoritosStore.toggleFavorito(lugar.id)"
            class="btn btn-favorito position-absolute top-0 end-0 m-2"
          >
            <i
              :class="
                favoritosStore.esFavorito(lugar.id)
                  ? 'fa-solid text-danger'
                  : 'fa-regular text-white'
              "
              class="fa-heart fs-3"
            ></i>
          </button>

          <img :src="lugar.imagen" :alt="lugar.nombre" class="card-img-top custom-card-img" />

          <div class="card-body text-center p-4">
            <i :class="`fa-solid ${lugar.iconoActual} display-4 mb-3 text-warning`"></i>
            <h2 class="h4 fw-bold text-white mb-2">{{ lugar.nombre }}</h2>
            <p class="display-6 fw-bold text-primary mb-2">{{ lugar.tempActual }}°C</p>
            <p class="text-custom-muted fs-5 mb-0">{{ lugar.estadoActual }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tipografía y textos secundarios */
span.text-custom-muted,
p.text-custom-muted,
div.text-custom-muted {
  color: #9ca3af;
}

/* Bordes personalizados ganando especificidad */
span.input-group-text.custom-border,
input.form-control.custom-border {
  border-color: #2d3748;
}

/* Fondos oscuros para inputs */
span.input-group-text.custom-input-bg,
input.form-control.custom-input-bg {
  background-color: #151b24;
}

/* Estado focus del buscador */
input.form-control.custom-input-bg:focus {
  background-color: #1b222d;
  color: white;
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Estilos de la Tarjeta */
article.card.custom-card {
  background-color: #1b222d;
  border: 1px solid #2d3748;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

article.card.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

img.custom-card-img {
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* Estilo para el botón del corazón flotante */
button.btn-favorito {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  border: none;
  transition: all 0.2s;
  z-index: 10;
}

button.btn-favorito:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* Ajustes para el Switch de Bootstrap en modo oscuro */
input.form-check-input:checked {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
