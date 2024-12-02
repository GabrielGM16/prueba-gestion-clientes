<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
    <form
      @submit.prevent="registerCustomer"
      class="max-w-lg w-full p-8 bg-white shadow-2xl rounded-2xl space-y-6 text-gray-800"
    >
      <h2 class="text-3xl font-bold text-center text-primary">Register Customer</h2>

      <!-- Campo Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
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
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="customer.email"
          type="email"
          placeholder="you@example.com"
          class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @blur="validateEmail"
          required
        />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <!-- Campo Contraseña -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="customer.password"
          type="password"
          placeholder="********"
          class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="validatePassword"
          required
        />
        <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
      </div>

      <!-- Confirmar Contraseña -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="********"
          class="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="validatePassword"
          required
        />
        <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match.</p>
      </div>

      <!-- Botón Enviar -->
      <button
        type="submit"
        class="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        :disabled="!isFormValid"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Define reactive customer object
const customer = reactive({
  name: '',
  email: '',
  password: '',
});

const confirmPassword = ref('');
const passwordError = ref('');
const passwordMismatch = ref(false);
const emailError = ref('');
const isFormValid = ref(true);

// Function to validate password
const validatePassword = () => {
  const password = customer.password;
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}$/;

  if (!regex.test(password)) {
    passwordError.value =
      'Password must be 10-15 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol.';
    isFormValid.value = false;
  } else {
    passwordError.value = '';
    isFormValid.value = true;
  }

  passwordMismatch.value = customer.password !== confirmPassword.value;
};

// Function to validate email
const validateEmail = async () => {
  try {
    const response = await fetch(`http://localhost:5000/customers`);
    const customers = await response.json();

    if (customers.some((c) => c.email === customer.email)) {
      emailError.value = 'This email is already in use.';
      isFormValid.value = false;
    } else {
      emailError.value = '';
      isFormValid.value = true;
    }
  } catch (error) {
    console.error('Failed to validate email', error);
  }
};

// Function to register a customer
const registerCustomer = async () => {
  if (passwordMismatch.value) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error('Failed to register customer');
    alert('Customer registered successfully!');
    customer.name = '';
    customer.email = '';
    customer.password = '';
    confirmPassword.value = '';
  } catch (error) {
    alert(error.message);
  }
};
</script>
