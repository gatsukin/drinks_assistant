<template>
    <button @click="$emit('toggleFilter')">
        <i class="fa-solid fa-filter"></i>
    </button>
    <RouterLink to="/bar/add" custom v-slot="{ isActive, navigate }">
        <button @click="navigate" :class="{ active: isActive }">
            <i class="fa-solid fa-plus"></i>
        </button>
    </RouterLink>
</template>

