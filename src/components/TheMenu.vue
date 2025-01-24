<template>
    <nav>
        <RouterLink to="/" custom v-slot="{ isActive, navigate }">
            <button @click="navigate" :class="{ active: isActive }">
                <i class="menu-button fa fa-user" aria-hidden="true"></i>
            </button>
        </RouterLink>
        <RouterLink to="/bar" custom v-slot="{ isActive, navigate }">
            <button @click="navigate" :class="{ active: isActive }">
                <i
                    class="menu-button fa fa-martini-glass-citrus"
                    aria-hidden="true"
                ></i>
            </button>
        </RouterLink>
    </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
nav {
    position: fixed;
    bottom: max(var(--tg-safe-area-inset-bottom, 34px), 20px);
    // bottom: 10px;
    left: 10px;
    right: 10px;
    height: 50px;
    width: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    border-radius: 10px;
}
button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    transition: .25s;

    &.active {
        background-color: #646cff;
    }

    &:not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    &:last-child {
        border-radius: 0 10px 10px 0;
    }
    &:first-child {
        border-radius: 10px 0 0 10px;
    }
}
</style>
