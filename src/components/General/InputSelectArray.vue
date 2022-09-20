<script setup>
import { ref } from 'vue';

const props = defineProps({
    options: Array,
    selectedValue: Number,
    ariaLabel: String,
});

const emit = defineEmits(['action']);
const selectedValue = ref(props.selectedValue);

function handleChange() {
    emit('action', selectedValue.value);
}

</script>

<template>
    <div>
        <label for="InputSelect">
            <slot />
        </label>

        <select id="InputSelect" class="form-select" aria-label="{{props.ariaLabel}}" v-model="selectedValue"
            @change="handleChange()">
            <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
        <hr />
    </div>
</template>

<style scoped>
</style>