<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="modal-mask">
                <div class="modal-container">
                    <div class="modal-header">
                        <div>{{ title }}</div>
                        <button class="close-btn" @click="close">×</button>
                    </div>

                    <div class="modal-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        default: "Модальное окно",
    },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

watch(
    () => props.modelValue,
    (val) => {
        isOpen.value = val;
        if (val) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }
);

const close = () => {
    emit("update:modelValue", false);
};

// Закрытие по ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen.value) {
        close();
    }
});
</script>

<style scoped lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
}

.modal-container {
    background-color: #242424;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    margin: 0 20px;
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header {
    padding: 10px 20px;
    border-bottom: 1px solid #4f4f4f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}

.modal-body {
    padding: 20px;
}


.close-btn {
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0 8px;
}

.close-btn:hover {
    color: #333;
}

/* Анимации */
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.9);
}
</style>
