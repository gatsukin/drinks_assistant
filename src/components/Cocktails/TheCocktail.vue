<template>
    <VCard class="position-relative">
        <VCardText>
            <div class="mb-2">
                <h4 class="text-h4 mb-2">
                    <span class="text-high-emphasis">🍹</span>
                    {{ cocktail.name }}
                </h4>
                <div class="tags text-body-1 ga-1">
                    <span v-for="(taste, i) in cocktail.taste" :key="i">
                        {{ taste }}</span
                    >
                </div>
            </div>
            <div class="d-flex flex-column ga-1 my-4">
                <div class="text-body-1">Состав:</div>
                <div class="d-flex overflow-auto ga-1">
                    <VChip
                        :color="
                            resolveColorIngredient(
                                excludeIngredients.includes(ing)
                            )
                        "
                        size="small"
                        class="text-capitalize"
                        v-for="ing in cocktail.ingredients"
                        :key="ing"
                    >
                        {{ ing }}
                    </VChip>
                </div>
            </div>
            <div class="d-flex mb-3">
                <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
                    Рецепт
                </VBtn>

                <VSpacer />

                <VBtn
                    icon
                    size="small"
                    @click="isCardDetailsVisible = !isCardDetailsVisible"
                >
                    <VIcon
                        :icon="
                            isCardDetailsVisible
                                ? 'ri-arrow-up-s-line'
                                : 'ri-arrow-down-s-line'
                        "
                    />
                </VBtn>
            </div>

            <VExpandTransition>
                <div v-show="isCardDetailsVisible">
                    <VDivider />
                    <VCardText>
                        <ol class="recipe__step">
                            <li
                                v-for="(step, index) in cocktail.recipe"
                                :key="index"
                            >
                                {{ step }}
                            </li>
                        </ol>
                    </VCardText>
                </div>
            </VExpandTransition>
        </VCardText>
    </VCard>
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

const isCardDetailsVisible = ref(false);

const resolveColorIngredient = (ing) => {
    if (ing === false) return "success";

    return "primary";
};
</script>

<style scoped lang="scss">
// .cocktail {
//     margin-bottom: 25px;
//     background-color: #2c2c2c;
//     border-radius: 10px;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//     &__header {
//         padding: 10px 15px 0;
//         h3 {
//             color: var(--tg-theme-text-color);
//             margin-top: 0;
//             font-size: 1.4em;
//             font-weight: 900;
//             margin-bottom: 5px;
//         }

.tags {
    display: flex;
    flex-wrap: wrap;

    span {
        font-style: italic;
        white-space: nowrap;
        line-height: 1.05;
        &:not(:last-child) {
            &::after {
                content: " /";
            }
        }
    }
}
//     }
// }

.ingredients {
    padding: 15px 15px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

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
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 15px;
    cursor: pointer;

    h4 {
        padding: 5px 0;
    }

    ol {
        li {
            padding: 3px 0;
        }
    }
}
</style>
