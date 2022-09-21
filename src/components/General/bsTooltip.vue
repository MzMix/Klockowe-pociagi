<script setup>
//Import from Vue, Bootstrap
import { onMounted } from "vue";
import { Tooltip } from 'bootstrap'
onMounted(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // eslint-disable-next-line no-unused-vars
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
})
const props = defineProps({
    placement: {
        type: String,
        required: false,
        default: 'right',
        validator(value) {
            return ['top', 'right', 'bottom', 'left'].includes(value)
        }
    },
    title: {
        type: String,
        required: true,
        default: 'Tooltip'
    }
})
</script>
    
<template>

    <span data-bs-toggle="tooltip" :data-bs-placement="props.placement" :data-bs-title="props.title">
        <slot>Tooltip here</slot>
    </span>

</template>
    
<style scoped>

</style>