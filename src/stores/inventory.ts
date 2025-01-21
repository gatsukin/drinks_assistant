import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInventory, Cocktail } from '../types';

export const useInventoryStore = defineStore('inventory', () => {
  const userInventories = ref<UserInventory[]>([]);
  const availableCocktails = ref<Cocktail[]>([]);

  const addToInventory = (userId: number, item: string) => {
    const inventory = userInventories.value.find(inv => inv.userId === userId);
    if (inventory) {
      if (!inventory.items.includes(item)) {
        inventory.items.push(item);
      }
    } else {
      userInventories.value.push({
        userId,
        items: [item]
      });
    }
    updateAvailableCocktails(userId);
  };

  const removeFromInventory = (userId: number, item: string) => {
    const inventory = userInventories.value.find(inv => inv.userId === userId);
    if (inventory) {
      inventory.items = inventory.items.filter(i => i !== item);
      updateAvailableCocktails(userId);
    }
  };

  const getInventory = (userId: number): string[] => {
    const inventory = userInventories.value.find(inv => inv.userId === userId);
    return inventory?.items || [];
  };

  const updateAvailableCocktails = async (userId: number) => {
    const inventory = getInventory(userId);
    availableCocktails.value = mockCocktails.filter(cocktail => 
      cocktail.requiredIngredients.every(ingredient => 
        inventory.includes(ingredient)
      )
    );
  };

  // Расширенный список коктейлей
  const mockCocktails: Cocktail[] = [
    {
      id: '1',
      name: 'Московский мул',
      requiredIngredients: ['Водка', 'Имбирное пиво', 'Лайм'],
      instructions: 'В медную кружку положите лед, добавьте 50 мл водки, сок половины лайма, долейте имбирным пивом. Украсьте долькой лайма и веточкой мяты.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400'
    },
    {
      id: '2',
      name: 'Маргарита',
      requiredIngredients: ['Текила', 'Трипл сек', 'Лайм'],
      instructions: 'В шейкер со льдом добавьте 50 мл текилы, 25 мл трипл сека и 25 мл свежевыжатого сока лайма. Взбейте и процедите в бокал с соленой каемкой.',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'
    },
    {
      id: '3',
      name: 'Негрони',
      requiredIngredients: ['Джин', 'Кампари', 'Красный вермут'],
      instructions: 'В бокал со льдом налейте 30 мл джина, 30 мл Кампари и 30 мл красного вермута. Перемешайте барной ложкой и украсьте цедрой апельсина.',
      image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=400'
    },
    {
      id: '4',
      name: 'Мохито',
      requiredIngredients: ['Белый ром', 'Лайм', 'Мята', 'Сахарный сироп'],
      instructions: 'В высокий бокал положите 6-8 листьев мяты, добавьте 20 мл сахарного сиропа и дольки лайма. Слегка подавите мяту, добавьте 50 мл рома, лед и долейте содовой.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400'
    },
    {
      id: '5',
      name: 'Олд Фэшн',
      requiredIngredients: ['Бурбон', 'Ангостура биттер', 'Сахар'],
      instructions: 'В стакан положите кубик сахара, пропитайте его биттером. Разомните, добавьте 60 мл бурбона и лед. Перемешайте и украсьте цедрой апельсина.',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400'
    },
    {
      id: '6',
      name: 'Дайкири',
      requiredIngredients: ['Белый ром', 'Лайм', 'Сахарный сироп'],
      instructions: 'В шейкере со льдом смешайте 60 мл белого рома, 30 мл свежевыжатого сока лайма и 15 мл сахарного сиропа. Взбейте и процедите в охлажденный бокал.',
      image: 'https://images.unsplash.com/photo-1606767341197-2de0b8c9e19f?w=400'
    },
    {
      id: '7',
      name: 'Джин-тоник',
      requiredIngredients: ['Джин', 'Тоник'],
      instructions: 'В высокий бокал со льдом налейте 50 мл джина, долейте тоником. Украсьте долькой лайма или огурца.',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400'
    },
    {
      id: '8',
      name: 'Пина Колада',
      requiredIngredients: ['Белый ром', 'Кокосовое молоко', 'Ананасовый сок'],
      instructions: 'В блендере смешайте 60 мл белого рома, 60 мл кокосового молока, 90 мл ананасового сока и лед. Взбейте до однородности и украсьте долькой ананаса.',
      image: 'https://images.unsplash.com/photo-1607446045710-d5a8fd0bc8db?w=400'
    }
  ];

  return {
    userInventories,
    availableCocktails,
    addToInventory,
    removeFromInventory,
    getInventory,
    updateAvailableCocktails
  };
});