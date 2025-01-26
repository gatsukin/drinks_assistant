<template>
    <div class="name">Статистика</div>
    <div class="stats">
        <div class="stats__block">
            <div class="stats__block--name">Имя пользователя</div>
            <div class="stats__block--count">{{ user.name }}</div>
        </div>

        <div class="stats__block">
            <div class="stats__block--name">Ваш бар</div>
            <div class="stats__block--count">{{ bar_lenght_db }}</div>
        </div>

        <div class="stats__block">
            <div class="stats__block--name">Ингредиентов в базе</div>
            <div class="stats__block--count">{{ ingredients_lenght_db }}</div>
        </div>

        <div class="stats__block">
            <div class="stats__block--name">Коктейлей в базе</div>
            <div class="stats__block--count">{{ cocktails_lenght_db }}</div>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
const {user,bar_lenght_db, cocktails_lenght_db, ingredients_lenght_db} = useAppStore();
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
    flex-direction: column;
    justify-content: space-between;

    &__block {
        width: 100%;
        padding: 10px 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        &:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        &--name {
            font-size: 16px;
            font-weight: 500;
        }

        &--count {
            font-size: 16px;
            font-weight: 600;
        }
    }
}
</style>
