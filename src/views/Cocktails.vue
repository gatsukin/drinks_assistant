<template>
    <TheHeader>
        <FilterButtons @toggleFilter="cocktailFinderComponent.toggleFilter()"></FilterButtons>
    </TheHeader>
    <TheFinder ref="cocktailFinderComponent" :bar="bar" :cocktails="cocktails"  />
</template>

<script setup>
import { ref } from "vue";

import TheHeader from '../components/TheHeader.vue'
import TheFinder from "../components/Cocktails/TheFinder.vue";
import FilterButtons from "../components/Cocktails/FilterButtons.vue";


import { useAppStore } from "@/stores/app";
const { bar, cocktails } = useAppStore();

const cocktailFinderComponent = ref(null);

</script>
