<template>
    <div class="bar-header">
        <div class="bar-header--row">
            <div class="bar-header__pagename">Бар</div>
            <div class="btn-wrap">
                <button @click="toggleAccordion">
                    <i class="fa-solid fa-filter"></i>
                </button>
                <button @click="toggleAddModal">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>

        <div class="filter">
            <div class="filter-content" :class="{ open: FilterIsOpen }">
                <div class="bar-switcher">
                    <label
                        class="bar-switcher__btn"
                        v-for="(item, i) in switchArray"
                        :key="i"
                    >
                        <input
                            type="radio"
                            name="type_alcohol"
                            :value="item.value"
                            v-model="switchValue"
                            hidden
                        />
                        <span>{{ item.name }}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <ul class="bar-list" v-if="filteredBar.length > 0">
        <li class="bar-item" v-for="item in filteredBar" :key="item.id">
            <div class="bar-item__name">
                {{ item.name }}
            </div>
            <div class="bar-item__type">
                {{ item.type }}
            </div>
        </li>
    </ul>
    <div v-else class="bar-list__empty">
        <div class="empty-text">В баре пока что ничего нет</div>
        <button @click="toggleAddModal">Добавить в бар</button>
    </div>

    <TheModal v-model="showAddModal" title="Пополнение бара">
        <FormAddToBar @submit="submitDrink"></FormAddToBar>
    </TheModal>
</template>

<script setup>
import { ref, computed } from "vue";
import FormAddToBar from "@/components/FormAddToBar.vue";

import { useAppStore } from "@/stores/app";
const app = useAppStore();

const switchValue = ref("all");
const switchArray = [
    { name: "Все", value: "all" },
    { name: "Алкоголь", value: "alcohol" },
    { name: "Безалкогольное", value: "none" },
];

const filteredBar = computed(() => {
    return app.bar.filter((item) => {
        if (switchValue.value === "all") return true;
        if (switchValue.value === "none") return !item.isAlcoholic;
        if (switchValue.value === "alcohol") return item.isAlcoholic;
        return true;
    });
});

const FilterIsOpen = ref(false);
const toggleAccordion = () => {
    FilterIsOpen.value = !FilterIsOpen.value;
};

const showAddModal = ref(false);
const toggleAddModal = () => {
    showAddModal.value = !showAddModal.value;
};

const submitDrink = async (drink) => {
    try {
        await app.addDrinkToBar(drink);
        showAddModal.value = false;
    } catch (error) {
        console.error("Ошибка добавления:", error);
    }
};
</script>

<style scoped lang="scss">
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
    }
    &__pagename {
        font-size: 24px;
        font-weight: 700;
    }

    .btn-wrap {
        display: flex;
        flex-direction: row;
        gap: 10px;

        button {
            font-size: .9em;
        }
    }
}
.bar-switcher {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    &__btn {
        width: 100%;
        cursor: pointer;

        span {
            display: flex;
            justify-content: center;
            font-size: 16px;
            padding: 5px 10px;
            font-weight: 500;
            font-family: inherit;
            background-color: var(--tg-theme-button-color);
            color: var(--tg-theme-button-text-color);
            width: 100%;
            border-radius: 8px;
            border: 2px solid transparent;
            transition: 0.25s;
        }

        input:checked + span {
            border-color: var(--tg-theme-button-text-color) !important;
        }
    }
}
.bar-list {
    list-style: none;
    padding: 0;
    margin: 10px;

    &__empty {
        .empty-text {
            font-size: 24px;
            font-weight: 600;
        }
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        padding: 10vh 0;
    }

    .bar-item {
        padding: 5px 0;
        &__name {
            font-size: 20px;
        }
        &__type {
            font-size: 14px;
        }
        &:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
}
.filter {
    &-item {
        overflow: hidden;
    }
    &-header {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: 700;
        align-items: center;
        transition: background-color 0.2s;
        i {
            margin-left: 10px;
        }
    }
    &-header:hover {
    }
    &-content {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &.open {
            padding: 5px 0px;
            max-height: 100px; /* Можно регулировать в зависимости от содержимого */
        }
    }
}
</style>
