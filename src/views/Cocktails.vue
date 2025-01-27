<template>
    <CocktailFinder :bar="bar" :cocktails="cocktails"  />
</template>

<script setup>
import CocktailFinder from "../components/CocktailFinder.vue";
import { useAppStore } from "@/stores/app";
const { bar, cocktails } = useAppStore();
</script>
