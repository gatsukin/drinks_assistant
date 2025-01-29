<template>
    <VCard class="nav">
        <RouterLink to="/" custom v-slot="{ isActive, navigate }">
            <VBtn
                color="secondary"
                variant="plain"
                @click="navigate"
                :class="{ active: isActive }"
            >
                <VIcon :size="iconSize" icon="ri-goblet-line" />
            </VBtn>
        </RouterLink>
        <RouterLink to="/bar" custom v-slot="{ isActive, navigate }">
            <VBtn
                color="secondary"
                variant="plain"
                @click="navigate"
                :class="{ active: isActive }"
            >
                <VIcon :size="iconSize" icon="ri-instance-line" />
            </VBtn>
        </RouterLink>
        <RouterLink to="/user" custom v-slot="{ isActive, navigate }">
            <VBtn
                color="secondary"
                variant="plain"
                @click="navigate"
                :class="{ active: isActive }"
            >
                <VIcon :size="iconSize" icon="ri-user-line" />
            </VBtn>
        </RouterLink>
    </VCard>
</template>

<script setup>
import { RouterLink } from "vue-router";
const iconSize = 25
</script>

<style scoped lang="scss">
.nav {
    position: fixed;
    bottom: max(var(--tg-safe-area-inset-bottom, 34px), 20px);
    left: 10px;
    right: 10px;
    height: 50px;
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 10px;
}
button.v-btn {
    width: calc(100% / 3);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    transition: 0.25s;

    &.active {
        color: rgb(var(--v-theme-primary)) !important;
    }

    &:not(:last-of-type) {
        border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    }
    &:last-child {
        border-radius: 0 10px 10px 0;
    }
    &:first-child {
        border-radius: 10px 0 0 10px;
    }
}
</style>
