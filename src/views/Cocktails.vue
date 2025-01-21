<script setup lang="ts">
import { ref, computed } from 'vue';
import { useBarStore } from '../stores/barStore';

const barStore = useBarStore();

// This would typically come from your database
const cocktails = ref([
  {
    id: 1,
    name: 'Gin & Tonic',
    ingredients: ['gin'],
    recipe: 'Mix gin with tonic water, add lime',
  },
  {
    id: 2,
    name: 'Moscow Mule',
    ingredients: ['vodka'],
    recipe: 'Mix vodka with ginger beer and lime juice',
  },
  // Add more cocktails
]);

const availableCocktails = computed(() => {
  const userDrinkTypes = new Set(barStore.drinks.map(d => d.type));
  return cocktails.value.filter(cocktail => 
    cocktail.ingredients.every(ingredient => userDrinkTypes.has(ingredient))
  );
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Available Cocktails</h2>
    
    <div v-if="barStore.isLoading" class="text-center py-4">
      Loading...
    </div>
    <div v-else-if="availableCocktails.length === 0" class="text-center py-4 bg-white rounded-lg shadow">
      <p class="text-gray-500">No cocktails available with your current bar inventory</p>
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <div
        v-for="cocktail in availableCocktails"
        :key="cocktail.id"
        class="bg-white rounded-lg shadow p-4"
      >
        <h3 class="text-lg font-semibold mb-2">{{ cocktail.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">
          Ingredients: {{ cocktail.ingredients.join(', ') }}
        </p>
        <p class="text-sm">{{ cocktail.recipe }}</p>
      </div>
    </div>
  </div>
</template>