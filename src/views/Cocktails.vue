<template>
    <CocktailFinder :bar="bar" :cocktails="cocktails" :ingredients="ingredients" />
</template>

<script setup>
import CocktailFinder from "../components/CocktailFinder.vue";
import { useAppStore } from "@/stores/app";
const { bar, cocktails,ingredients } = useAppStore();
</script>
