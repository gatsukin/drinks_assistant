<script setup>
import { useBarStore } from '../stores/barStore';
import { ref, onMounted, watch } from 'vue';

const barStore = useBarStore();
const newDrink = ref({
  name: '',
  type: '',
  volume: 0,
});
const isAdding = ref(true);

// Handle MainButton for adding drinks
const showAddForm = () => {
  isAdding.value = true;
  window.Telegram.WebApp.MainButton.hide();
};

const hideAddForm = () => {
  isAdding.value = false;
  newDrink.value = { name: '', type: '', volume: 0 };
  window.Telegram.WebApp.MainButton.show();
};

const addNewDrink = async () => {
  if (!newDrink.value.name) return;
  
  // window.Telegram.WebApp.MainButton.showProgress();
  
  try {
    await barStore.addDrink(window.Telegram.WebApp.initDataUnsafe.user?.id || 0, {
      name: newDrink.value.name,
    });
    // hideAddForm();
  } finally {
    // window.Telegram.WebApp.MainButton.hideProgress();
  }
};

onMounted(() => {
  // window.Telegram.WebApp.MainButton.setText('Add Drink');
  // window.Telegram.WebApp.MainButton.show();
  // window.Telegram.WebApp.MainButton.onClick(showAddForm);
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">My Bar</h2>
    
    <div v-if="isAdding" class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold">Add New Drink</h3>
      </div>
      <form @submit.prevent="addNewDrink" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="newDrink.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Drink
        </button>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-lg font-semibold mb-3">My Drinks</h3>
      <div v-if="barStore.isLoading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
      <div v-else-if="barStore.drinks.length === 0" class="text-center py-4 text-gray-500">
        No drinks in your bar yet
      </div>
      <ul v-else class="space-y-2">
        <li
          v-for="drink in barStore.drinks"
          :key="drink.id"
          class="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
        >
          <div>
            <span class="font-medium">{{ drink.name }}</span>
            <span class="text-sm text-gray-500 ml-2">({{ drink.type }})</span>
          </div>
          <span class="text-sm">{{ drink.volume }}ml</span>
        </li>
      </ul>
    </div>
  </div>
</template>