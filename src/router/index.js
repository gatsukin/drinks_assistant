import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import MyBar from '../views/MyBar.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/bar',
      name: 'bar',
      component: MyBar,
    },
  ],
});

export default router
