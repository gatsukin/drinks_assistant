import { getOrCreateUser, fetchUserBar, sendDrinkToBar } from "@/api/app";

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        user: {},
        bar: [],
    }),
    actions: {
        async init() {
            this.user = await getOrCreateUser();
            this.bar = await fetchUserBar();
        },
        async addDrinkToBar(drink) {
            let newDrink = await sendDrinkToBar(drink);
            this.bar.push(newDrink);
            return newDrink;
        },
    },
});
