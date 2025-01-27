<template>
    <div class="bar-header--row">
        <div class="bar-header__pagename">Бар</div>
        <div class="btn-wrap">
            <button >
                <i class="fa-solid fa-filter"></i>
            </button>
        </div>
    </div>
    <div class="cocktails-list">
        <div v-if="availableCocktails.length === 0" class="empty">
            Нет доступных коктейлей
        </div>

        <TheCocktail
            v-for="cocktail in availableCocktails"
            :key="cocktail.name"
            :cocktail="cocktail"
            :excludeIngredients="excludeIngredients"
        ></TheCocktail>
    </div>
</template>

<script setup>
import TheCocktail from "./TheCocktail.vue";
import { computed } from "vue";
import excludeIngredients from "../json/exclude_ingredients.json";
const props = defineProps({
    bar: {
        type: Array,
        default: () => [],
        validator: (value) =>
            value.every(
                (item) =>
                    item?.type?.name && item?.type?.group && item?.type?.image
            ),
    },
    cocktails: {
        type: Array,
        default: () => [],
    },
});

const availableCocktails = computed(() => {
    // Получаем список доступных ингредиентов
    const available = props.bar.map((item) => item.type.name);

    return props.cocktails.filter((cocktail) => {
        return cocktail.ingredients.every((ingredient) => {
            const normalized = ingredient;
            return (
                excludeIngredients.includes(normalized) ||
                available.includes(normalized)
            );
        });
    });
});
</script>

<style scoped lang="scss">
.cocktails-list {
    max-width: 800px;
    margin: 20px auto;
}
.bar-header {
    background-color: var(--tg-theme-bg-color);
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    &--row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .btn-wrap {
            display: flex;
            flex-direction: row;
            gap: 10px;

            button {
                font-size: 0.9em;
            }
        }
    }
    &__pagename {
        font-size: 24px;
        font-weight: 700;
    }
}
.empty {
    text-align: center;
    color: #718096;
    padding: 40px 20px;
    font-size: 1.1em;
}
</style>
