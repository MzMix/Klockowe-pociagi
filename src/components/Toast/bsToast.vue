<script setup>
import { computed } from 'vue';

const props = defineProps({
    Theme: {
        required: false,
        type: String,
        default: 'white',
        validator(value) {
            return ['white', 'purple', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value);
        }
    },
    Name: {
        required: true,
        type: String,
        default: `Toast-${Date.now()}`
    }
});

const Theme = computed(() => {

    let result = `bg-${props.Theme} `;

    if (['white', 'info'].includes(props.Theme)) {
        result += 'text-dark';
    } else {
        result += 'text-white';
    }

    return result;
});

</script>

<template>

    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" :id="props.Name">

        <div class="toast-header" :class="Theme">
            <div class="me-2">
                <slot name="icon"><i class="bi bi-info-circle"></i></slot>
            </div>
            <strong class="me-auto">
                <slot name="header">Bootstrap</slot>
            </strong>
            <small>
                <slot name="time">11 mins ago</slot>
            </small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>

        <div class="toast-body bg-white">
            <slot name="body">Hello, world! This is a toast message.</slot>
        </div>
    </div>

</template>

<style scoped>

</style>