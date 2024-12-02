<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// No se necesita lógica adicional aquí, ya que `app.vue` actúa como el contenedor global.
</script>

<style>
/* Estilo personalizado opcional */
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
}
</style>
