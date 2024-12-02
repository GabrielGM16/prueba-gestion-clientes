<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
    <div class="max-w-lg w-full p-8 bg-white shadow-2xl rounded-2xl text-gray-800">
      <h2 class="text-3xl font-bold text-center text-primary mb-6">
        Update Customer
      </h2>
      <form @submit.prevent="updateCustomer" class="space-y-6">
        <!-- Campo Nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
          <input
            id="name"
            v-model="customer.name"
            type="text"
            placeholder="Enter name"
            class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Campo Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input
            id="email"
            v-model="customer.email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @blur="checkEmailUnique"
            required
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Campo Contraseña -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">New Password</label>
          <input
            id="password"
            v-model="newPassword"
            type="password"
            placeholder="********"
            class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="validatePassword"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <!-- Confirmar Contraseña -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm New Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="********"
            class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="validatePassword"
          />
          <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match.</p>
        </div>

        <!-- Botones -->
        <div class="flex justify-between items-center">
          <button
            type="button"
            @click="cancelEdit"
            class="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            :disabled="!isFormValid"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const customerId = route.params.id;

const customer = reactive({
  name: '',
  email: '',
  password: '',
});

const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const emailError = ref('');
const passwordMismatch = ref(false);
const isFormValid = ref(false);

// Validar contraseña nueva
const validatePassword = () => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}$/;

  if (newPassword.value && !regex.test(newPassword.value)) {
    passwordError.value =
      'Password must be 10-15 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol.';
    isFormValid.value = false;
  } else if (newPassword.value === customer.password) {
    passwordError.value = 'New password cannot be the same as the current password.';
    isFormValid.value = false;
  } else {
    passwordError.value = '';
    isFormValid.value = true;
  }

  passwordMismatch.value = newPassword.value !== confirmPassword.value;
};

// Validar si el correo es único
const checkEmailUnique = async () => {
  try {
    const response = await fetch(`http://localhost:5000/customers/email/${customer.email}`);
    if (response.ok) {
      const data = await response.json();
      if (data.exists && data.id !== customerId) {
        emailError.value = 'This email is already registered.';
        isFormValid.value = false;
      } else {
        emailError.value = '';
        isFormValid.value = true;
      }
    }
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    emailError.value = 'Failed to validate email.';
  }
};

// Cargar datos del cliente
const fetchCustomer = async () => {
  try {
    const response = await fetch(`http://localhost:5000/customers/${customerId}`);
    if (!response.ok) throw new Error('Failed to load customer data');
    const data = await response.json();
    customer.name = data.name;
    customer.email = data.email;
    customer.password = data.password;
  } catch (error) {
    console.error(error.message);
    alert('Failed to load customer data');
  }
};

// Actualizar cliente
const updateCustomer = async () => {
  if (passwordMismatch.value || emailError.value) {
    alert('Please fix the errors before submitting.');
    return;
  }

  try {
    const updatedData = {
      ...customer,
      password: newPassword.value || customer.password,
    };

    const response = await fetch(`http://localhost:5000/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Failed to update customer');
    alert('Customer updated successfully!');
    router.push('/');
  } catch (error) {
    console.error(error.message);
    alert('Failed to update customer');
  }
};

// Cancelar edición
const cancelEdit = () => {
  router.push('/');
};

// Cargar datos al montar
onMounted(fetchCustomer);
</script>
