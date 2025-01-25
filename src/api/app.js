import supabase from "@/services/supabase";
import { useTelegram } from "@/services/telegram";

const { user } = useTelegram();

const MY_ID = user?.id ?? 268666333;

export async function getOrCreateUser() {
    const pontentialUser = await supabase
        .from("users")
        .select()
        .eq("telegram", MY_ID);

    if (pontentialUser.data.length !== 0) {
        console.log(pontentialUser.data[0]);
        return pontentialUser.data[0];
    }

    const newUser = {
        telegram: MY_ID,
        name: user.first_name ? user.first_name : user.username,
    };

    if (import.meta.env.VITE_DEV == "true") return newUser;

    let { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();

    return data[0];
}
export async function fetchUserBar() {
    try {
        const { data, error } = await supabase
            .from("user_drinks")
            .select("*")
            .eq("user_telegram", MY_ID);

        if (error) throw error;

        console.log('✅ Bar is loaded');

        return data;
    } catch (error) {
        console.error("Error fetching bar:", error);
    }
}
export async function sendDrinkToBar(drink) {
    try {
        const { data, error } = await supabase
            .from("user_drinks")
            .insert([{ ...drink, user_telegram: MY_ID }])
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error adding drink:", error);
    }
}
export async function fetchCocktails() {
    try {
        const { data, error } = await supabase.from("cocktails").select("*");
        if (error) throw error;
        console.log('✅ Cocktails is loaded');
        
        return data;
    } catch (error) {
        console.error("Error fetching bar:", error);
    }
}
export async function fetchIngredients() {
    try {
        const { data, error } = await supabase.from("ingredients").select("*");
        if (error) throw error;
        console.log('✅ Ingredients is loaded');

        return data
    } catch (error) {
        console.error("Error fetching bar:", error);
    }
}
export async function fetchIngredientsGroup() {
    try {
        const { data, error } = await supabase.from("ingredients_group").select("*");
        if (error) throw error;

        console.log('✅ Ingredients Group is loaded');

        return data
    } catch (error) {
        console.error("Error fetching bar:", error);
    }
}
