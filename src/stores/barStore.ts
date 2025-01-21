import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../supabase';

interface Drink {
  id: number;
  name: string;
  type: string;
  volume: number;
}

export const useBarStore = defineStore('bar', () => {
  const drinks = ref<Drink[]>([]);
  const isLoading = ref(false);

  async function fetchUserBar(userId: number) {
    isLoading.value = true;
    try {
      const { data, error } = await supabase
        .from('user_drinks')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      drinks.value = data;
    } catch (error) {
      console.error('Error fetching bar:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addDrink(userId: number, drink: Omit<Drink, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('user_drinks')
        .insert([{ ...drink, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      drinks.value.push(data);
    } catch (error) {
      console.error('Error adding drink:', error);
    }
  }

  return {
    drinks,
    isLoading,
    fetchUserBar,
    addDrink,
  };
});