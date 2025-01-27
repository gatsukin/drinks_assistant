<template>
    <div class="cocktail">
        <div class="cocktail__header">
            <h3>
                {{ cocktail.name }}
            </h3>
            <div class="tags">
                <span v-for="(taste, i) in cocktail.taste" :key="i">
                    {{ taste }}
                </span>
            </div>
        </div>
        <div class="ingredients">
            <div class="ingredients__name">Состав:</div>
            <div class="ingredients__wrap">
                <span
                    v-for="ing in cocktail.ingredients"
                    :key="ing"
                    :class="{
                        excluded: excludeIngredients.includes(ing),
                    }"
                >
                    {{ ing }}
                </span>
            </div>
        </div>
        <div class="recipe" @click="toggleAccardion">
            <h4>Рецепт:</h4>
            <ol class="recipe__step" :class="accardion ? 'open' : ''">
                <li v-for="(step, index) in cocktail.recipe" :key="index">
                    {{ step }}
                </li>
            </ol>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    cocktail: {
        type: Object,
    },
    excludeIngredients: {
        type: Object,
    },
});

const accardion = ref(false);
const toggleAccardion = () => {
    accardion.value = !accardion.value;
};
</script>

<style scoped lang="scss">
.cocktail {
    margin-bottom: 25px;
    border: 1px solid var(--tg-theme-hint-color);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    display: flex;
    flex-direction: column;
    gap: 15px;
    &__header {
        padding: 10px 10px 0;
        h3 {
            color: var(--tg-theme-text-color);
            margin-top: 0;
            font-size: 1.4em;
            font-weight: 900;
            margin-bottom: 5px;
        }

        .tags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0px 5px;

            span {
                font-style: italic;
                white-space: nowrap;
                line-height: 1.05;
                &:not(:last-child) {
                    &::after {
                        content: ' /';
                    }
                }
            }
        }
    }
}

.ingredients {
    padding: 15px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-top: 1px solid #eee;

    &__name {
        font-weight: 900;
    }
    &__wrap {
        display: flex;
        flex-direction: row;
        overflow: auto;
        gap: 8px;
        padding-bottom: 10px;
    }

    span {
        background: rgba(255, 255, 255, 0.1);
        display: inline-block;
        color: var(--tg-theme-text-color);
        padding: 6px 12px;

        border-radius: 10px;
        font-size: 14px;

        white-space: nowrap;
    }
    .excluded {
        background: #fff3cd;
        color: #856404;
    }
}

.recipe {
    padding-top: 15px;
    border-top: 1px solid #eee;
    color: #fff;
    padding: 10px;
    cursor: pointer;

    h4 {
        padding: 5px 0;
    }

    &__step {
        max-height: 0px;
        overflow: hidden;
        transition: 0.25s;
        padding: 0 0 0 20px;
        &.open {
            max-height: 1000px;
            padding: 10px 0 10px 20px;
        }

        li {
            padding: 3px 0;
        }
    }
}
</style>
