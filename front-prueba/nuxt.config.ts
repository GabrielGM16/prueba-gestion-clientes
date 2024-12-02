// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Archivos CSS globales
  css: ['@/assets/css/tailwind.css'],

  // Módulos de Nuxt
  modules: [
    '@pinia/nuxt', // Pinia para manejo de estado global
    '@nuxtjs/tailwindcss', // Tailwind CSS como módulo oficial
  ],

  // Configuración de compatibilidad
  compatibilityDate: '2024-12-01', // Fecha de compatibilidad recomendada

  // Configuración de Runtime
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:5000', // Base de la API
    },
  },

  // Configuración específica para Tailwind CSS (directamente en el módulo de TailwindCSS)
  tailwindcss: {
    viewer: false, // Desactiva el visor de configuración (opcional)
  },
});
