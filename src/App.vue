<template>
    <VApp>
        <main v-if="loaded" class="page">
            <div class="page-content">
                <RouterView />
            </div>
            <TheMenu />
        </main>
        <main v-else class="loader">
            <TheLoader />
        </main>
    </VApp>
</template>

<script setup>
import { useRoute, RouterView } from "vue-router";
import TheMenu from "./components/TheMenu.vue";
import { onMounted, ref } from "vue";
import { useAppStore } from "@/stores/app";

import { useTelegram } from "@/services/telegram";

const loaded = ref(false);
const app = useAppStore();
const route = useRoute();

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
    position: relative;
    padding: 10px 0 0;

    .page-content {
        padding: 0 10px 10px;
        height: 100%;
        overflow: auto;
        padding-bottom: 60px;
    }
}
</style>
