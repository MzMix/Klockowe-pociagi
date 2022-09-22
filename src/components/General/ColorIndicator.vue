<script setup>
//Import from Vue
import { onMounted, ref } from 'vue';

//Import Color Palette Store
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

//Color Palette Store
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteSelectedColor } = ColorPaletteStore;

const position = ref({
    top: 0,
    left: 0
});

const onMouseMove = (e) => {
    position.value.left = e.pageX + 'px';
    position.value.top = e.pageY + 'px';
};

onMounted(() => {
    document.addEventListener('mousemove', onMouseMove);
});

</script>
    
<template>

    <div :id="'Colorindicator'"
        :style="{top: position.top, left: position.left, backgroundColor: InterpreteSelectedColor()}"
        class="border border-dark d-none">
    </div>

</template>
    
<style scoped>
#Colorindicator {
    position: absolute !important;
    z-index: 999 !important;
    transform: translate(-100%, -100%);
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 10%;
}
</style>