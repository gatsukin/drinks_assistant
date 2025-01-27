<template>
    <TheHeader>
        <BarFilterButtons @toggleFilter="theBarComponent.toggleFilter()"></BarFilterButtons>
    </TheHeader>
    <TheBar ref="theBarComponent"></TheBar>
</template>
<script setup>
import { ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import BarFilterButtons from "../components/Bar/BarFilterButtons.vue";
import TheBar from "../components/Bar/TheBar.vue";

const theBarComponent = ref(null);
</script>
