<template>
    <TheFilter :filterIsOpen="filterIsOpen" @toggleFilter="toggleFilter(false)">
        <div class="filter-form-group">
            <label>Название</label>
            <input type="text" v-model="filterName" placeholder="Название" />
        </div>
    </TheFilter>

    <div class="bar-list" v-if="filteredBar.length > 0">
        <VCard
            v-for="item in filteredBar"
            :key="item.id"
            class="d-flex bar-item"
        >
            <img :src="item.type.image" alt="" />
            <div class="bar-item__info">
                <div class="bar-item__type">
                    {{ item.type.name }}
                </div>
                <div class="bar-item__name">
                    {{ item.title }}
                </div>
            </div>
            <VBtn variant="outlined" color="error" class="bar-item__delete">
                <VIcon :size="16" icon="ri-delete-bin-line" />
            </VBtn>
        </VCard>
    </div>

    <div v-else class="bar-list__empty">
        <div class="empty-text">В баре пока что ничего нет</div>
        <RouterLink to="/bar/add" custom v-slot="{ isActive, navigate }">
            <VBtn @click="navigate" :class="{ active: isActive }">
                Добавить в бар
            </VBtn>
        </RouterLink>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppStore } from "@/stores/app";
const { bar, deleteDrink } = useAppStore();

import TheFilter from "../TheFilter.vue";

const filterName = ref("");

const filteredBar = computed(() => {
    if (!filterName.value) return bar; // Если поиск пустой, показываем всё

    const searchQuery = filterName.value.toLowerCase();

    return bar.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(searchQuery);
        const typeNameMatch = item.type.name
            .toLowerCase()
            .includes(searchQuery);
        return titleMatch || typeNameMatch;
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
    toggleFilter,
});
</script>

<style scoped lang="scss">
.filter-form-group {
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
.bar-list {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
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
        display: flex;
        flex-direction: row;
        gap: 10px;

        img {
            width: 80px;
            min-width: 80px;
            overflow: hidden;
            object-fit: cover;
        }
        &__info {
            display: flex;
            flex-direction: column;
            padding: 10px 0;
        }
        &__name {
            font-size: 16px;
            line-height: 1.1;
            margin-top: 10px;
        }
        &__type {
            font-size: 20px;
            line-height: 1.1;
        }
        &__delete {
            margin: auto 10px auto auto;
            padding: 10px;
        }
    }
}
</style>
