<template>
    <VBtn @click="$emit('toggleFilter')">
        <VIcon :size="20" icon="ri-filter-line" />
    </VBtn>
    <RouterLink
        to="/bar/add"
        custom
        v-slot="{ isActive, navigate }"
        v-if="user.telegram == user.bar_id"
    >
        <VBtn @click="navigate" :class="{ active: isActive }">
            <VIcon :size="20" icon="ri-add-line" />
        </VBtn>
    </RouterLink>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
const { user } = useAppStore();

defineEmits(["toggleFilter"]);
</script>
