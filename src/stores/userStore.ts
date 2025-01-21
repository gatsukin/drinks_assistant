import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userId = ref<number | null>(null);
  const username = ref<string>('');

  function setUser(id: number, name: string) {
    userId.value = id;
    username.value = name;
  }

  return {
    userId,
    username,
    setUser,
  };
});