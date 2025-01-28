<template>
    <VCard class="stats">
        <div class="stats__block">
            <div class="stats__block--name">Имя пользователя</div>
            <div class="stats__block--count">{{ user.name }}</div>
        </div>

        <VDivider />

        <div class="stats__block">
            <div class="stats__block--name">Ваш бар</div>
            <div class="stats__block--count">{{ bar_lenght_db }}</div>
        </div>

        <VDivider />


        <div class="stats__block">
            <div class="stats__block--name">Ингредиентов в базе</div>
            <div class="stats__block--count">{{ ingredients_lenght_db }}</div>
        </div>

        <VDivider />

        <div class="stats__block">
            <div class="stats__block--name">Коктейлей в базе</div>
            <div class="stats__block--count">{{ cocktails_lenght_db }}</div>
        </div>
    </VCard>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
const {user,bar_lenght_db, cocktails_lenght_db, ingredients_lenght_db} = useAppStore();
</script>

<style scoped lang="scss">


.stats {
    &__block {
        width: 100%;
        padding: 10px 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;


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
