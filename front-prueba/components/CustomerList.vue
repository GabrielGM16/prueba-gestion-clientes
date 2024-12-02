<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
    <h2 class="text-2xl font-bold text-primary mb-6 text-center">
      Customer List
    </h2>
    <!-- Lista de clientes -->
    <ul v-if="customers.length" class="divide-y divide-gray-200">
      <li
        v-for="customer in customers"
        :key="customer.id"
        class="flex justify-between items-center py-4"
      >
        <!-- Información del cliente -->
        <div>
          <p class="text-lg font-medium text-gray-800">{{ customer.name }}</p>
          <p class="text-sm text-gray-600">{{ customer.email }}</p>
        </div>
        <!-- Botones de acción -->
        <div class="flex items-center gap-2">
          <button
            @click="editCustomer(customer)"
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-4 py-2 rounded-lg transition"
          >
            Edit
          </button>
          <button
            @click="deleteCustomer(customer.id)"
            class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <!-- Mensaje si no hay clientes -->
    <p v-else class="text-center text-gray-600 text-lg mt-6">
      No customers found.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Para redirigir al formulario de edición

const customers = ref([]);
const router = useRouter(); // Inicializa el router

// Función para obtener la lista de clientes
const fetchCustomers = async () => {
  try {
    const response = await fetch('http://localhost:5000/customers');
    customers.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }
};

// Función para eliminar un cliente
const deleteCustomer = async (id) => {
  if (!confirm('Are you sure you want to delete this customer?')) return;
  try {
    const response = await fetch(`http://localhost:5000/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete customer');
    alert('Customer deleted successfully!');
    fetchCustomers(); // Refresca la lista después de eliminar
  } catch (error) {
    alert(error.message);
  }
};

// Función para redirigir al formulario de edición
const editCustomer = (customer) => {
  router.push(`/edit/${customer.id}`); // Redirige a la página de edición
};

// Llama a fetchCustomers cuando el componente se monte
onMounted(fetchCustomers);
</script>
