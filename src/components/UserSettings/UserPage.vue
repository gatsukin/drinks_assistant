<template>
    <div class="user-page">
        <ShareBar></ShareBar>
        <TheStats></TheStats>
    </div>
</template>
<script setup>
import TheStats from "./TheStats.vue";
import ShareBar from "./ShareBar.vue";
</script>
<style scoped lang="scss">
.user-page {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>