<script setup>
import { computed } from "vue";
import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { SetColorNumber, InterpreteColorValue } = ColorPaletteStore;
const props = defineProps({
    color: Number
});

const fillColor = computed(() => {
    return InterpreteColorValue(props.color);
});

</script>

<template>
    <div @click="SetColorNumber(props.color)" class="ratio-1x1 ColorSelectBTN fs-1 m-1"
        :style="{ backgroundColor: fillColor }"> </div>
</template>

<style scoped>
.ColorSelectBTN {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    width: 5vw;
    height: 5vw;
    border: 1px solid;
    border-radius: 10%;
    font-size: 1rem !important;
}

.ColorSelectBTN:hover {
    transform: scale(1.1);
}
</style>