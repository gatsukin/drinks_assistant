import { getOrCreateUser, fetchUserBar, sendDrinkToBar, fetchCocktails, fetchIngredients, fetchIngredientsGroup } from "@/api/app";

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        user: {},
        
        bar: [],
        bar_lenght_db: 0,

        cocktails: [],
        cocktails_lenght_db: 0,

        ingredients: [],
        ingredients_lenght_db: 0,

        ingredients_group: []
    }),
    actions: {
        async init() {
            this.user = await getOrCreateUser();

            let barData = await fetchUserBar();
            if(barData) {
                this.bar = barData
                this.bar_lenght_db = barData.length
            }

            let cocktailsData = await fetchCocktails();
            if (cocktailsData) {
                this.cocktails = cocktailsData;
                this.cocktails_lenght_db = cocktailsData.length
            }

            let ingredientsData = await fetchIngredients();
            if(ingredientsData) {
                this.ingredients = ingredientsData
                this.ingredients_lenght_db = ingredientsData.length
            }

            this.ingredients_group = await fetchIngredientsGroup();
        },
        async addDrinkToBar(drink) {
            let newDrink = await sendDrinkToBar(drink);
            this.bar.push(newDrink);
            return newDrink;
        },
    },
});
