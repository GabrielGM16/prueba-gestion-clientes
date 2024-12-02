<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Edit Customer</h1>
    <CustomerUpdate :customerId="customerId" />
  </div>
</template>

<script setup>
import CustomerUpdate from '@/components/CustomerUpdate.vue';
import { useRoute } from 'vue-router';

// Obtener el ID del cliente desde la URL
const route = useRoute();
const customerId = route.params.id; // ID dinámico
</script>
