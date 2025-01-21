import { createRouter, createWebHistory } from 'vue-router';
import MyBar from '../views/MyBar.vue';
import Cocktails from '../views/Cocktails.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'my-bar',
      component: MyBar,
    },
    {
      path: '/cocktails',
      name: 'cocktails',
      component: Cocktails,
    },
  ],
});