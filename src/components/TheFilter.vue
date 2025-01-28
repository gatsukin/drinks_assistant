<template>
    <v-navigation-drawer
        :model-value="props.filterIsOpen"
        @update:model-value="$emit('toggleFilter', $event)"
        @click:outside="$emit('toggleFilter')"
        width="350"
        location="end"
        temporary
        class="sidebar-filter"
    >
        <div class="filter-header">
            <div class="filter-header--row">
                <h3 class="text-h3">Фильтр</h3>

                <div class="btn-wrap">
                    <VBtn @click="$emit('toggleFilter')">
                        <VIcon :size="20" icon="ri-close-large-line" />
                    </VBtn>
                </div>
            </div>
        </div>

        <div class="filter-content">
            <slot></slot>
        </div>
    </v-navigation-drawer>
</template>
<script setup>
const props = defineProps({
    filterIsOpen: {
        type: Boolean,
        default: false,
    },
});
defineEmits(['toggleFilter']);


</script>
<style scoped lang="scss">
.sidebar-filter {
    z-index: 100000 !important;
    // width: 100% !important;
    padding: 10px 10px;
    padding-top: calc(var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top) + 10px);
}
.filter {
    &-header {
        display: flex;
        align-items: center;
        font-weight: 700;
        align-items: center;
        &--row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .text-h3 {
            height: 50px;
            display: flex;
            align-items: center;
        }

        .btn-wrap {
            display: flex;
            flex-direction: row;
            gap: 10px;

            button {
                font-size: 0.9em;
            }
        }
    }
    &-content {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;

        padding: 5px 0px 15px;
        max-height: 80vh;
    }
}
</style>
