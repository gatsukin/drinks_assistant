<template>
    <div class="bar-header">
        <div class="bar-header--row">
            <div class="bar-header__pagename">{{ router.meta.headerName }}</div>

            <div class="btn-wrap" >

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
    background-color: var(--tg-theme-bg-color);
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 1000000;
    &--row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    &__pagename {
        font-size: 24px;
        font-weight: 700;
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
