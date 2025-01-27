<template>
    <div class="filter">
        <div class="filter-content" :class="{ open: filterIsOpen }">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    filterIsOpen: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped lang="scss">
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

        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: -1;
        opacity: 0;
        &.open {
            padding: 5px 0px 15px;
            max-height: 80vh;
            opacity: 1;
            z-index: 1000;
        }
    }
}
</style>
