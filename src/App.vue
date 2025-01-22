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
    height: calc(100% - 50px);
    overflow: hidden;
    padding: 20px 0 0;

    .page-content {
        padding: 0 20px 20px;
        height: 100%;
        overflow: auto;
    }
}
</style>
