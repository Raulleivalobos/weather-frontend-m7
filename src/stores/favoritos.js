import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  // Lista de IDs de ciudades favoritas
  const favoritos = ref([])

  // Función para agregar o quitar de favoritos
  const toggleFavorito = (id) => {
    const index = favoritos.value.indexOf(id)
    if (index === -1) {
      favoritos.value.push(id) // Si no está, lo agrega
    } else {
      favoritos.value.splice(index, 1) // Si ya está, lo quita
    }
  }

  // Función para comprobar si una ciudad es favorita
  const esFavorito = (id) => favoritos.value.includes(id)

  // Limpiar favoritos (ideal para cuando el usuario cierra sesión)
  const limpiarFavoritos = () => {
    favoritos.value = []
  }

  return { favoritos, toggleFavorito, esFavorito, limpiarFavoritos }
})
