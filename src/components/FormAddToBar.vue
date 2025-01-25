<template>
    <form @submit.prevent="handleSubmit" class="drink-form">
        <div class="form-group">
            <label>Название напитка:</label>
            <input
                type="text"
                v-model="drink.name"
                required
                placeholder="Введите название"
                class="form-input"
            />
        </div>

        <div class="form-group">
            <label>Тип напитка:</label>
            <multiselect
                v-model="drink.group"
                :options="groupOptions"
                :searchable="false"
                label="name"
                track-by="name"
                placeholder="Выберите тип"
                required
            />
        </div>

        <div class="form-group">
            <label>Напиток:</label>
            <multiselect
                v-model="drink.ingredient"
                :options="ingredientOptions"
                group-values="items"
                group-label="name"
                :group-select="false"
                placeholder="Выберите ингредиент"
                label="name"
                track-by="id"
                required
            >
                <template slot="singleLabel" slot-scope="{ option }">
                    {{ option.name }}
                </template>
            </multiselect>
        </div>

        <button type="submit" class="submit-btn">Добавить напиток</button>
    </form>
</template>

<script setup>
import { ref, computed } from "vue";
import Multiselect from "vue-multiselect";
import { useAppStore } from "@/stores/app";

const { ingredients, ingredients_group } = useAppStore();

const drink = ref({
    name: "",
    group: { name: "all" },
    ingredient: null,
});

// Опции для групп
const groupOptions = computed(() => [
    { name: "all", label: "Любой" },
    ...ingredients_group.map((g) => ({ name: g.name })),
]);

// Опции для ингредиентов с группировкой
const ingredientOptions = computed(() => {
    const filtered =
        drink.value.group.name === "all"
            ? ingredients
            : ingredients.filter((i) => i.group === drink.value.group.name);

    const groups = filtered.reduce((acc, item) => {
        const group = item.group;
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {});

    return Object.keys(groups).map((group) => ({
        name: group,
        items: groups[group],
    }));
});

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
    emit("submit", {
        name: drink.value.name,
        group: drink.value.group.name,
        ingredient: drink.value.ingredient,
    });

    // Сброс формы
    drink.value = {
        name: "",
        group: { name: "all" },
        ingredient: null,
    };
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.form-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: border-color 0.2s;

    &:focus {
        border-color: #3b82f6;
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
}

.submit-btn {
    display: block;
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2563eb;
    }

    &:active {
        background-color: #1d4ed8;
    }
}

:deep(.multiselect) {
    .multiselect__tags {
        @apply border-gray-300 rounded-lg;
        min-height: 42px;
    }

    .multiselect__option--group {
        @apply bg-gray-100 text-gray-700 font-semibold;
    }

    .multiselect__option--highlight {
        @apply bg-blue-500 text-white;
    }
}
</style>
