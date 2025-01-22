<template>
    <div class="name">Здравствуй, {{user.name}}!</div>
    <div class="stats">
        <div class="stats__block">
            <div class="stats__block--name">Ваш бар</div>
            <div class="stats__block--count">{{ bar.length }}</div>
        </div>
        <div class="stats__block">
            <div class="stats__block--name">Коктейлей доступно</div>
            <div class="stats__block--count">2</div>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
const {user,bar} = useAppStore();
</script>

<style scoped lang="scss">
.profile {
    background-color: #2c2c2c;
    padding: 10px;
    border-radius: 10px;
}

.name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
}

.stats {
    background-color: #2c2c2c;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__block {
        width: 100%;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        &--name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        &--count {
            font-size: 18px;
            font-weight: 600;
        }
    }
}
</style>
