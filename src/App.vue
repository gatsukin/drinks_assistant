<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInventoryStore } from './stores/inventory';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        MainButton: {
          show(): void;
          hide(): void;
          setText(text: string): void;
          onClick(fn: () => void): void;
        };
        expand(): void;
        close(): void;
      };
    };
  }
}

const store = useInventoryStore();
const newItem = ref('');

const addItem = () => {
  if (newItem.value.trim()) {
    const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 1;
    store.addToInventory(userId, newItem.value.trim());
    newItem.value = '';
  }
};

onMounted(() => {
  // Инициализация Telegram Web App
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
  
  // Получаем ID пользователя из Telegram
  const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 1;
  store.updateAvailableCocktails(userId);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-center">Cocktail Assistant</h1>
      
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <h2 class="text-lg font-semibold mb-3">Ваш бар</h2>
        <div class="flex gap-2 mb-3">
          <input
            v-model="newItem"
            type="text"
            placeholder="Добавить ингредиент..."
            class="flex-1 p-2 border rounded text-sm"
            @keyup.enter="addItem"
          >
          <button
            @click="addItem"
            class="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
        
        <ul class="space-y-1">
          <li
            v-for="item in store.getInventory(1)"
            :key="item"
            class="flex justify-between items-center bg-gray-50 p-2 rounded text-sm"
          >
            <span>{{ item }}</span>
            <button
              @click="store.removeFromInventory(1, item)"
              class="text-red-500 hover:text-red-700"
            >
              Удалить
            </button>
          </li>
        </ul>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-3">Доступные коктейли</h2>
        <div class="space-y-3">
          <div
            v-for="cocktail in store.availableCocktails"
            :key="cocktail.id"
            class="border rounded p-3"
          >
            <div class="flex items-start gap-3">
              <img 
                v-if="cocktail.image" 
                :src="cocktail.image" 
                :alt="cocktail.name"
                class="w-20 h-20 object-cover rounded"
              >
              <div class="flex-1">
                <h3 class="text-base font-semibold">{{ cocktail.name }}</h3>
                <p class="text-sm text-gray-600 mb-1">
                  <strong>Ингредиенты:</strong>
                  {{ cocktail.requiredIngredients.join(', ') }}
                </p>
                <p class="text-sm">
                  <strong>Рецепт:</strong>
                  {{ cocktail.instructions }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: var(--tg-theme-bg-color, #fff);
  color: var(--tg-theme-text-color, #000);
}

button {
  background-color: var(--tg-theme-button-color, #3390ec);
  color: var(--tg-theme-button-text-color, #ffffff);
}

.bg-white {
  background-color: var(--tg-theme-secondary-bg-color, #fff);
}
</style>