import { createRouter, createWebHistory } from "vue-router";

import Cocktails from "../views/Cocktails.vue";
import MyBar from "../views/MyBar.vue";
import AddMyBar from "../views/AddMyBar.vue";
import Status from "../views/Status.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "cocktails",
            component: Cocktails,
            meta: {
                headerName: 'Коктейли'
            }
        },
        {
            path: "/bar",
            name: "bar",
            component: MyBar,
            meta: {
                headerName: 'Бар'
            }
        },
        {
            path: "/bar/add",
            name: "add-bar",
            component: AddMyBar,
            meta: {
                headerName: 'Добавить напиток в бар'
            }
        },
        {
            path: "/status",
            name: "status",
            component: Status,
            meta: {
                headerName: 'Статистика'
            }
        },
    ],
});

export default router;
