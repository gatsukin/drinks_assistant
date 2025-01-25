import { createRouter, createWebHistory } from 'vue-router';

import Cocktails from '../views/Cocktails.vue';
import MyBar from '../views/MyBar.vue';
import Status from '../views/Status.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'cocktails',
      component: Cocktails,
    },
    {
      path: '/bar',
      name: 'bar',
      component: MyBar,
    },
    {
      path: '/status',
      name: 'status',
      component: Status,
    },
  ],
});

export default router
