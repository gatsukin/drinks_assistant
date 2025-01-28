<template>
    <div class="bar-header">
        <div class="bar-header--row">
            <h3 class="text-h3">{{ router.meta.headerName }}</h3>

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
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 1000000;
    margin-bottom: 10px;
    &--row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
