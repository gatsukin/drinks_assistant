<template>
    <TheFilter :filterIsOpen="filterIsOpen">
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
    </TheFilter>


    <ul class="bar-list" v-if="filteredBar.length > 0">
        <li class="bar-item" v-for="item in filteredBar" :key="item.id">
            <img :src="item.type.image" alt="" />
            <div class="bar-item__info">
                <div class="bar-item__type">
                    {{ item.type.name }}
                </div>
                <div class="bar-item__name">
                    {{ item.title }}
                </div>
            </div>
            <button
                class="bar-item__delete"
                @click="deleteDrinkAction(item.id)"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>
    </ul>
    <div v-else class="bar-list__empty">
        <div class="empty-text">В баре пока что ничего нет</div>
        <RouterLink to="/bar/add" custom v-slot="{ isActive, navigate }">
            <button @click="navigate" :class="{ active: isActive }">
                Добавить в бар
            </button>
        </RouterLink>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppStore } from "@/stores/app";
const { bar, deleteDrink } = useAppStore();

import TheFilter from "../TheFilter.vue";

const switchValue = ref("all");
const switchArray = [
    { name: "Все", value: "all" },
    { name: "Алкоголь", value: "alcohol" },
    { name: "Безалкогольное", value: "none" },
];

const filteredBar = computed(() => {
    return bar.filter((item) => {
        if (switchValue.value === "all") return true;
        if (switchValue.value === "none") return !item.isAlcoholic;
        if (switchValue.value === "alcohol") return item.isAlcoholic;
        return true;
    });
});

const filterIsOpen = ref(false);
const toggleFilter = () => {
    filterIsOpen.value = !filterIsOpen.value;
};

const deleteDrinkAction = async (id) => {
    await deleteDrink(id);
};

defineExpose({
  toggleFilter
})
</script>

<style scoped lang="scss">
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
    margin: 10px 0;

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
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        gap: 10px;

        img {
            width: 80px;
            min-width: 80px;
            height: 80px;
            overflow: hidden;
            border-radius: 10px;
            object-fit: cover;
        }
        &__info {
            display: flex;
            flex-direction: column;
        }
        &__name {
            font-size: 16px;
            margin-top: 10px;
            color: rgba($color: #fff, $alpha: 0.7);
        }
        &__type {
            font-size: 20px;
            color: #fff;
        }
        &__delete {
            margin-left: auto;
            // width: 20px;
        }
        &:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
}

</style>
