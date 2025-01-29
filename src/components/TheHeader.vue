<template>
    <div class="bar-header">
        <div class="bar-header--row">
            <h3 class="text-h3">{{ router.meta.headerName }}</h3>

            <div class="btn-wrap">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";

const router = useRoute();
</script>

<style scoped lang="scss">
.bar-header {
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 100;
    margin-bottom: 10px;
    background: rgba(var(--v-theme-background), .8);
    backdrop-filter: blur(2px);
    border-bottom: 1px solid var(--v-theme-background);
    &--row {
        display: flex;
        flex-direction: row;
        align-items: center; 
        justify-content: space-between;
    }

    .text-h3 {
        height: 40px;
        display: flex;
        align-items: center;
    }

    .btn-wrap {
        display: flex;
        flex-direction: row;
        gap: 10px;

        button {
            font-size: 0.9em;
        }
    }
}
</style>
