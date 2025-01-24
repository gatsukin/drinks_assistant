import supabase from "@/services/supabase";
import { useTelegram } from "@/services/telegram";

const { user } = useTelegram();

const MY_ID = user?.id ?? 268666333;

export async function getOrCreateUser() {
    // 1. Исправляем опечатку в переменной
    const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select()
        .eq("telegram", MY_ID);

    // 2. Обрабатываем ошибку поиска
    if (findError) {
        console.error("Error finding user:", findError);
        throw findError;
    }

    // 3. Если пользователь найден - возвращаем
    if (existingUser && existingUser.length > 0) {
        return existingUser[0];
    }

    // 4. Проверяем наличие объекта user
    if (!user) {
        throw new Error("User object is undefined");
    }

    // 5. Создаем нового пользователя
    const newUser = {
        telegram: MY_ID,
        name: user.first_name || user.username || "Anonymous",
        created_at: new Date().toISOString(),
    };

    // 6. В режиме разработки можно добавить логирование
    if (import.meta.env.VITE_DEV) {
        console.log("Dev mode: would create user", newUser);
        return newUser;
    }

    // 7. Вставляем пользователя с возвратом данных
    const { data: createdUser, error: createError } = await supabase
        .from("users")
        .insert([newUser])
        .select();

    // 8. Обрабатываем ошибку создания
    if (createError) {
        console.error("Error creating user:", createError);
        throw createError;
    }

    return createdUser[0];
}
export async function fetchUserBar() {
    try {
        const { data, error } = await supabase
            .from("user_drinks")
            .select("*")
            .eq("user_telegram", MY_ID);

        if (error) throw error;
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
