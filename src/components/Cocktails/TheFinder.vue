<template>
    <TheFilter :filterIsOpen="filterIsOpen">
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
const toggleFilter = () => {
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
        // Фильтр по ингредиентам
        const hasIngredients = cocktail.ingredients.every((ingredient) => {
            const normalized = ingredient;
            return (
                excludeIngredients.includes(normalized) ||
                available.includes(normalized)
            );
        });

        // Фильтр по имени
        const matchesName = cocktail.name
            .toLowerCase()
            .includes(filters.value.name.toLowerCase());

        // Фильтр по всем параметрам (strength, taste, base, group, series)
        const matchesFilters = Object.entries(filters.value).every(
            ([key, value]) => {
                if (key === "name") return true; // Имя уже проверено

                // Если выбрано "Любые" — пропускаем фильтр
                if (value.value === "любые") return true;

                // Проверяем, есть ли значение фильтра в taste или других массивах
                // Например, для strength проверяем cocktail.strength (если отдельное поле)
                // ИЛИ cocktail.taste (если все в одном массиве)

                // Предположим, что все параметры хранятся в cocktail.taste:
                return cocktail.taste.includes(value.value);

                // Если у каждого параметра свой массив (например, cocktail.strength):
                // return cocktail[key]?.includes(value.value);
            }
        );

        return hasIngredients && matchesName && matchesFilters;
    });
});

defineExpose({
    toggleFilter,
});
</script>
