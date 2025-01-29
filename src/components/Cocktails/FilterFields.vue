<template>
    <div class="cocktail-filter">
        <div
            class="form-group"
            v-for="(field, i) in search_field_setup"
            :key="i"
        >
            <label v-if="field.type === 'select'">{{ field.label }}:</label>
            <multiselect
                v-if="field.type === 'select'"
                v-model="search[field.key]"
                deselect-label="Can't remove this value"
                track-by="name"
                label="name"
                placeholder="Select one"
                :options="field.options"
                :searchable="false"
                @select="updateFilters"
                @remove="updateFilters"
            >
                <template v-slot:singleLabel="{ option }">
                    {{ option.name }}
                </template>
            </multiselect>

            <VTextField
                v-if="field.type === 'text'"
                v-model="search[field.key]"
                placeholder="Название"
                label="Название"
                @input="updateFilters"
            />
        </div>

        <VBtn @click="clearFilter"> Очистить </VBtn>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Multiselect from "vue-multiselect";

const emit = defineEmits(["update-filters"]);

import strength_list from "../../json/cocktail_filter_strength_list.json";
import taste_list from "../../json/cocktail_filter_taste_list.json";
import base_list from "../../json/cocktail_filter_base_list.json";
import group_list from "../../json/cocktail_filter_group_list.json";
import series_list from "../../json/cocktail_filter_series_list.json";

const search = ref({
    name: "",
    strength: { name: "Любые", value: "любые" },
    taste: { name: "Любые", value: "любые" },
    base: { name: "Любые", value: "любые" },
    group: { name: "Любые", value: "любые" },
    series: { name: "Любые", value: "любые" },
});

const search_field_setup = [
    {
        type: "text",
        label: "Название",
        key: "name",
    },
    {
        type: "select",
        label: "Градус",
        key: "strength",
        options: strength_list,
    },
    {
        type: "select",
        label: "Вкус",
        key: "taste",
        options: taste_list,
    },
    {
        type: "select",
        label: "Основа",
        key: "base",
        options: base_list,
    },
    {
        type: "select",
        label: "Группа",
        key: "group",
        options: group_list,
    },
    {
        type: "select",
        label: "Серия",
        key: "series",
        options: series_list,
    },
];

// Отправляем данные фильтров в родительский компонент
const updateFilters = () => {
    emit("update-filters", search.value);
};

const clearFilter = () => {
    search.value = {
        name: "",
        strength: { name: "Любые", value: "любые" },
        taste: { name: "Любые", value: "любые" },
        base: { name: "Любые", value: "любые" },
        group: { name: "Любые", value: "любые" },
        series: { name: "Любые", value: "любые" },
    };
    emit("update-filters", search.value);
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
.cocktail-filter {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .form-group {
        label {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
            display: flex;
        }
        input {
            display: flex;
            min-height: 40px;
            display: block;
            padding: 0 40px 0 13px;
            border-radius: 5px;
            border: 1px solid #e8e8e8;
            background: #fff;
            font-size: 14px;
            width: 100%;
            color: #212121;

            &::placeholder {
                opacity: 1;
                color: #212121;
            }
        }
    }
    :deep(.multiselect) {
        .multiselect__input,
        .multiselect__single {
            color: #212121;
        }
    }
}
</style>
