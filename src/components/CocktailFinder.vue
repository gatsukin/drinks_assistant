<template>
    <div class="cocktails-list">
        <div v-if="availableCocktails.length === 0" class="empty">
            Нет доступных коктейлей
        </div>

        <div
            v-for="cocktail in availableCocktails"
            :key="cocktail.name"
            class="cocktail"
        >
            <h3>{{ cocktail.name }}</h3>
            <div class="ingredients">
                <span
                    v-for="ing in cocktail.ingredients"
                    :key="ing"
                    :class="{
                        excluded: excludeIngredients.includes(
                            ing
                        ),
                    }"
                >
                    {{ ing }}
                </span>
            </div>
            <div class="recipe">
                <h4>Рецепт:</h4>
                <ol>
                    <li v-for="(step, index) in cocktail.recipe" :key="index">
                        {{ step }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import excludeIngredients from '../json/exclude_ingredients.json'
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

console.log(excludeIngredients);

const availableCocktails = computed(() => {
    // Получаем список доступных ингредиентов
    const available = props.bar.map((item) =>
        item.type.name
    );

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

<style>
.cocktails-list {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 15px;
}

.cocktail {
    padding: 20px;
    margin-bottom: 25px;
    border: 1px solid var(--tg-theme-hint-color);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

h3 {
    color: var(--tg-theme-text-color);
    margin-top: 0;
    font-size: 1.4em;
    font-weight: 900;
}

.ingredients {
    margin: 15px 0;
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.ingredients span {
    display: inline-block;
    color: var();
    padding: 6px 12px;

    border-radius: 10px;
    font-size: 0.9em;
}

.ingredients .excluded {
    background: #fff3cd;
    color: #856404;
}

.recipe {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

.recipe h4 {
    color: #4a5568;
    margin-bottom: 10px;
}

.recipe ol {
    padding-left: 20px;
    margin: 0;
}

.recipe li {
    margin-bottom: 8px;
    line-height: 1.5;
    color: #4a5568;
}

.empty {
    text-align: center;
    color: #718096;
    padding: 40px 20px;
    font-size: 1.1em;
}
</style>
