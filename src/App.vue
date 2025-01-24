<template>
    <main v-if="loaded">
        <div class="page">
            <div class="page-content">
                <RouterView />
            </div>
        </div>
        <TheMenu />
    </main>
    <main v-else class="loader">
        <TheLoader />
    </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import TheMenu from "./components/TheMenu.vue";
import { onMounted, ref } from "vue";
import { useAppStore } from "@/stores/app";

import { useTelegram } from "@/services/telegram";

const loaded = ref(false);
const app = useAppStore();

const { tg } = useTelegram();


app.init().then(() => {
    loaded.value = true;
});

onMounted(() => {
    tg.ready();

    tg.expand();
});
</script>

<style scoped lang="scss">
.page {
    height: 100%;
    overflow: hidden;
    padding: 10px 0 0;

    .page-content {
        padding: 0 10px 10px;
        height: 100%;
        overflow: auto;
        padding-bottom: 60px;
    }
}
</style>
