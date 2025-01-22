<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useUserStore } from "./stores/userStore";
import { useBarStore } from "./stores/barStore";
import { RouterView, useRoute } from "vue-router";

const userStore = useUserStore();
const barStore = useBarStore();
const route = useRoute();

const TG_DATA = window.Telegram.WebApp

// Проверяем наличие Telegram WebApp
const isTelegramWebApp = () => {
    return typeof window.Telegram?.WebApp !== "undefined";
};

onMounted(() => {
    if (!isTelegramWebApp()) {
        console.warn("Telegram WebApp not detected");
        return;
    }

    // Инициализируем данные пользователя
    const webApp = window.Telegram.WebApp;
	
	console.warn('Telegram WebApp:')
	console.log(window.Telegram.WebApp)

    const userData = webApp.initDataUnsafe?.user;

    if (userData) {
        const { id, first_name } = userData;
        userStore.setUser(id, first_name);
        barStore.fetchUserBar(id);
    }

    // Настройка WebApp
    webApp.ready();
    webApp.expand();

    // Настройка кнопки "Назад"
    // webApp.BackButton.onClick(() => {
    //     window.history.back();
    // });
});

// Обработка видимости кнопки "Назад"
watch(
    () => route.path,
    (path) => {
        if (!isTelegramWebApp()) return;

        const webApp = window.Telegram.WebApp;
        if (path === "/") {
            webApp.BackButton.hide();
        } else {
            webApp.BackButton.show();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <header
            class="bg-blue-600 text-white p-4 flex justify-between items-center"
        >
            <!-- <h1 class="text-xl font-bold">Drinks Assistant</h1> -->
            <div>
                {{ TG_DATA?.initDataUnsafe ? TG_DATA?.initDataUnsafe : 'ERROR TELEGRAM DATA' }}
            </div>
            <!-- <nav>
                <router-link
                    to="/cocktails"
                    class="text-white hover:text-blue-200 ml-4"
                    v-if="route.path === '/'"
                >
                    Cocktails
                </router-link>
                <router-link
                    to="/"
                    class="text-white hover:text-blue-200 ml-4"
                    v-if="route.path !== '/'"
                >
                    My Bar
                </router-link>
            </nav> -->
        </header>
        <!-- <main class="container mx-auto p-4">
            <RouterView />
        </main> -->
    </div>
</template>
