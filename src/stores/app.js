import { getOrCreateUser, fetchUserBar, sendDrinkToBar, fetchCocktails, fetchIngredients, fetchIngredientsGroup } from "@/api/app";

import { defineStore } from "pinia";

import cocktailsJson from '../json/cocktails.json'
import ingredientsJson from '../json/ingredients.json'
import ingredientsGroupJson from '../json/ingredients_group.json'


export const useAppStore = defineStore("app", {
    state: () => ({
        user: {},
        
        bar: [],
        bar_lenght_db: 0,

        cocktails: cocktailsJson,
        cocktails_lenght_db: cocktailsJson.length,

        ingredients: ingredientsJson,
        ingredients_lenght_db: ingredientsJson.length,

        ingredients_group: ingredientsGroupJson
    }),
    actions: {
        async init() {
            this.user = await getOrCreateUser();

            let barData = await fetchUserBar();
            if(barData) {
                console.log(barData);
                
                this.bar = barData
                this.bar_lenght_db = barData.length
            }

            // FROM DATABASE DATA
            
            // let cocktailsData = await fetchCocktails();
            // if (cocktailsData) {
            //     this.cocktails = cocktailsData;
            //     this.cocktails_lenght_db = cocktailsData.length
            // }

            // let ingredientsData = await fetchIngredients();
            // if(ingredientsData) {
            //     this.ingredients = ingredientsData
            //     this.ingredients_lenght_db = ingredientsData.length
            // }

            // this.ingredients_group = await fetchIngredientsGroup();
        },
        async addDrinkToBar(drink) {
            let newDrink = await sendDrinkToBar(drink);
            this.bar.push(newDrink);
            return newDrink;
        },
    },
});
