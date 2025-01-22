<template>
    <form @submit.prevent="handleSubmit" class="drink-form">
        <div class="form-group">
            <label for="name">Название напитка:</label>
            <input
                type="text"
                id="name"
                v-model="drink.name"
                required
                placeholder=""
            />
        </div>

        <div class="form-group">
            <label for="type">Тип напитка:</label>
            <select id="type" v-model="drink.type" required>
                <option disabled value=""></option>
                <option v-for="type in drinkTypes" :key="type">
                    {{ type }}
                </option>
            </select>
        </div>

        <div class="form-group checkbox-group">
            <label>
                <input type="checkbox" v-model="drink.isAlcoholic" />
                Алкогольный
            </label>
        </div>

        <button type="submit" class="submit-btn">Добавить напиток</button>
    </form>
</template>

<script setup>
import { ref } from "vue";

const drink = ref({
    name: "",
    type: "",
    isAlcoholic: false,
});

const drinkTypes = ref([
    "Джин",
    "Водка",
    "Ром",
    "Виски",
    "Текила",
    "Вермут",
    "Ликёр",
    "Тоник",
    "Сок",
    "Сироп",
]);

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
    emit("submit", {
        ...drink.value
    });

    // Сброс формы
    drink.value = {
        name: "",
        type: "",
        isAlcoholic: false,
    };
};
</script>

<style scoped lang="scss">
.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

input[type="text"],
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;

    &::placeholder {
        color: #fff;
    }
}

.checkbox-group {
    margin-top: 10px;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 8px;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
}

.submit-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
    width: 100%;
    margin-top: 15px;
}

.submit-btn:hover {
    background-color: #45a049;
}
</style>
