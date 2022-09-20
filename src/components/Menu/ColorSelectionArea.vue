<script setup>
//Import from Pinia, Vue
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';

//Import components
import ColorSelectButton from './ColorSelectButton.vue'

//Import Color Palette Store
import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

//Color Palette Store
const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, SelectedPalette } = storeToRefs(ColorPaletteStore);

//Inject Toast trigger
const ShowToast = inject('ToastTrigger');

const colorSet = computed(() => {
    return ColorPalettes.value[SelectedPalette.value].colorSet;
});

</script>

<template>
    <div class="text-center p-2 ps-3 w-100">

        <h3 class="mt-2 mb-4">Kolory <i class="bi bi-palette"></i></h3>
        <div class="d-flex flex-wrap">
            <div class="d-flex flex-wrap justify-content-around w-75 m-auto">
                <ColorSelectButton v-for="cl in colorSet" :key="colorSet.indexOf(cl)" :color="colorSet.indexOf(cl)" />
            </div>
        </div>

        <!-- Clear board -->
        <button class="btn btn-danger mt-4 w-75" @click="ShowToast(`#ClearBoard`, { autohide: false })
        ">Wyczyść planszę <i class="bi bi-trash"></i></button>
    </div>

</template>

<style scoped>

</style>
