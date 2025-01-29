<template>
    <VCard>
        <VCardText>
            <h4 class="text-h4">Поделитесь своим баром!</h4>
            <div class="share-bar">
                <VTextField
                    v-model="user.telegram"
                    placeholder="Ваш ID"
                    label="Ваш ID"
                    readonly
                />
                <VBtn @click="copyId" variant="outlined" size="x-large">
                    <VIcon :size="18" :icon="copyIcon" />
                </VBtn>
            </div>
        </VCardText>

        <VDivider />

        <VCardText>
            <h4 class="text-h4">Или используйте бар друга!</h4>
            <div class="share-bar">
                <VTextField
                    v-model="barId"
                    placeholder="ID друга"
                    label="ID Друга"
                />
                <VBtn @click="saveFriendId" size="x-large" variant="outlined">
                    <VIcon :size="20" icon="ri-save-line" />
                </VBtn>
                <VBtn
                    @click="deleteFriendId"
                    v-if="user.bar_id"
                    size="x-large"
                    color="error"
                    variant="outlined"
                >
                    <VIcon :size="18" icon="ri-delete-bin-line" />
                </VBtn>
            </div>
        </VCardText>
    </VCard>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

const { user, saveFriendBar } = useAppStore();
const copyIcon = ref("ri-file-copy-line"); // Изначальная иконка

const copyId = async () => {
    try {
        await navigator.clipboard.writeText(user.telegram);
        copyIcon.value = "ri-checkbox-circle-line";
        setTimeout(() => {
            copyIcon.value = "ri-file-copy-line";
        }, 2000);
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = user.telegram;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            copyIcon.value = "ri-checkbox-circle-line";
        } catch (copyErr) {
            console.error("Ошибка копирования:", copyErr);
            alert("Не удалось скопировать!");
        } finally {
            document.body.removeChild(textArea);
            setTimeout(() => {
                copyIcon.value = "ri-file-copy-line";
            }, 2000);
        }
    }
};

const barId = ref(user.bar_id ? user.bar_id : "");

const saveFriendId = async () => {
    await saveFriendBar(barId.value);
};

const deleteFriendId = async () => {
    barId.value = null;
    await saveFriendBar(barId.value);
};
</script>

<style scoped lang="scss">
.share-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    .v-btn {
        padding: 0 10px;
    }
}

.text-h4 {
    line-height: 1.2;
    margin-bottom: 20px;
}
</style>
