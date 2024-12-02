<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
    <div class="container mx-auto p-8 bg-white shadow-2xl rounded-2xl max-w-4xl">
      <h1 class="text-4xl font-heading font-bold text-primary text-center mb-8">
        Customer Management
      </h1>

      <!-- Formulario de creación -->
      <div v-if="!editingCustomer">
        <CustomerForm @refreshList="fetchCustomers" />
        <hr class="my-8 border-gray-300" />
        <!-- Lista de clientes -->
        <CustomerList
          :customers="customers"
          @edit="startEditing"
          @delete="deleteCustomer"
        />
      </div>

      <!-- Formulario de edición -->
      <div v-else>
        <CustomerUpdate
          :customer="editingCustomer"
          @cancel="cancelEditing"
          @update="fetchCustomers"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CustomerForm from '@/components/CustomerForm.vue';
import CustomerList from '@/components/CustomerList.vue';
import CustomerUpdate from '@/components/CustomerUpdate.vue';

const customers = ref([]);
const editingCustomer = ref(null);

const fetchCustomers = async () => {
  try {
    const response = await fetch('http://localhost:5000/customers');
    customers.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }
};

const startEditing = (customer) => {
  editingCustomer.value = customer;
};

const cancelEditing = () => {
  editingCustomer.value = null;
};

const deleteCustomer = async (id) => {
  if (!confirm('Are you sure you want to delete this customer?')) return;
  try {
    const response = await fetch(`http://localhost:5000/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete customer');
    alert('Customer deleted successfully!');
    fetchCustomers();
  } catch (error) {
    alert(error.message);
  }
};

onMounted(fetchCustomers);
</script>
