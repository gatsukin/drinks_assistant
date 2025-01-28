<template>
    <VApp >
        <div class="page" v-if="loaded">
            <div class="page-content">
                <RouterView />
            </div>
        </div>
        <TheMenu v-if="loaded"/>
        <TheLoader v-if="!loaded"/>
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
const route = useRoute()


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
    padding: 10px 10px 60px;

    .page-content {
        height: 100%;
        overflow: auto;
        padding-bottom: 60px;
    }
}
</style>
