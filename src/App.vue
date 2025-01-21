<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useUserStore } from './stores/userStore';
import { useBarStore } from './stores/barStore';
import { RouterView, useRoute } from 'vue-router';

const userStore = useUserStore();
const barStore = useBarStore();
const route = useRoute();

// Initialize Telegram Web App
onMounted(() => {
  // Initialize user data from Telegram
  if (window.Telegram.WebApp.initDataUnsafe.user) {
    const { id, first_name } = window.Telegram.WebApp.initDataUnsafe.user;
    userStore.setUser(id, first_name);
    barStore.fetchUserBar(id);
  }

  // Set up Telegram Web App
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();

  // Set up back button behavior
  window.Telegram.WebApp.BackButton.onClick(() => {
    window.history.back();
  });
});

// Handle back button visibility based on route
watch(() => route.path, (path) => {
  if (path === '/') {
    window.Telegram.WebApp.BackButton.hide();
  } else {
    window.Telegram.WebApp.BackButton.show();
  }
}, { immediate: true });
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Drinks Assistant</h1>
      <nav>
        <router-link 
          to="/cocktails" 
          class="text-white hover:text-blue-200 ml-4"
          v-if="route.path === '/'">
          Cocktails
        </router-link>
        <router-link 
          to="/" 
          class="text-white hover:text-blue-200 ml-4"
          v-if="route.path !== '/'">
          My Bar
        </router-link>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>