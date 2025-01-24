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
    bottom: calc(var(--tg-content-safe-area-inset-bottom) + 10px);
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

    &.active {
        background-color: #2c2c2c;
    }

    &:not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
}
</style>
