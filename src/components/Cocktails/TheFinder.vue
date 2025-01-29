<template>
    <TheFilter :filterIsOpen="filterIsOpen" @toggleFilter="toggleFilter(false)">
        <FilterFields @update-filters="handleFiltersUpdate"></FilterFields>
    </TheFilter>
    <div class="cocktails-list">
        <div v-if="filteredCocktails.length === 0" class="empty">
            Нет доступных коктейлей
        </div>

        <TheCocktail
            v-for="cocktail in filteredCocktails"
            :key="cocktail.name"
            :cocktail="cocktail"
            :excludeIngredients="excludeIngredients"
        ></TheCocktail>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

import TheCocktail from "./TheCocktail.vue";
import FilterFields from "./FilterFields.vue";
import TheFilter from "../TheFilter.vue";
import excludeIngredients from "../../json/exclude_ingredients.json";

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

const filterIsOpen = ref(false);
const toggleFilter = (val) => {
    console.log(val);
    if (val) {
        filterIsOpen.value = val;
        return;
    }
    filterIsOpen.value = !filterIsOpen.value;
};

// Состояние фильтров
const filters = ref({
    name: "",
    strength: { name: "Любые", value: "любые" },
    taste: { name: "Любые", value: "любые" },
    base: { name: "Любые", value: "любые" },
    group: { name: "Любые", value: "любые" },
    series: { name: "Любые", value: "любые" },
});

// Обработчик обновления фильтров
const handleFiltersUpdate = (updatedFilters) => {
    filters.value = updatedFilters;
};
// Фильтрация коктейлей
const filteredCocktails = computed(() => {
    const available = props.bar.map((item) => item.type.name);
    return props.cocktails.filter((cocktail) => {
        // Улучшенная нормализация строк
        function normalizeString(str) {
            return str
                .toLowerCase()
                .replace(/[^а-яё\s]/g, "") // Удаляем все не-буквы и не-пробелы
                .replace(/\s+/g, " ") // Убираем двойные пробелы
                .trim();
        }
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        // Функция проверки целого слова
        function hasWholeWord(targetStr, searchWord) {
            const normalizedTarget = normalizeString(targetStr);
            const normalizedSearch = normalizeString(searchWord);

            if (!normalizedSearch) return false;

            const pattern = new RegExp(
                `(^|\\s)${escapeRegExp(normalizedSearch)}(?=\\s|$)`,
                "i"
            );
            return pattern.test(normalizedTarget);
        }

        // Проверка ингредиентов
        const hasIngredients = cocktail.ingredients.every((ingredient) => {
            const isExcluded = excludeIngredients.some((excludeIngredient) =>
                hasWholeWord(ingredient, excludeIngredient)
            );

            const isAvailable = available.some((availIngredient) =>
                hasWholeWord(ingredient, availIngredient)
            );

            return isExcluded || isAvailable;
        });

        // Фильтр по имени
        const matchesName = cocktail.name
            .toLowerCase()
            .includes(filters.value.name.toLowerCase());

        // Фильтр по всем параметрам (strength, taste, base, group, series)
        const matchesFilters = Object.entries(filters.value).every(
            ([key, value]) => {
                if (key === "name") return true;
                if (value.value === "любые") return true;
                return cocktail.taste.includes(value.value);
            }
        );

        return hasIngredients && matchesName && matchesFilters;
    });
});

defineExpose({
    toggleFilter,
});
</script>

<style scoped lang="scss">
.cocktails-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
