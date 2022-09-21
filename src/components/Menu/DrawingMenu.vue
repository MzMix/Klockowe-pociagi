<script setup>
//Import from Pinia, Vueuse, Vue
import { storeToRefs } from 'pinia';
import { get } from '@vueuse/core';
import { inject } from 'vue';

//Import component
import InputSelectArray from '../General/InputSelectArray.vue';
import bsTooltip from '../General/bsTooltip.vue';

//Import stores from Pinia
import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { SetPalette, GetSelectedPaletteOrigin } = ColorPaletteStore;
const { ColorPalettes, SelectedPalette, AppName } = storeToRefs(ColorPaletteStore);

//Inject Toast trigger
const ShowToast = inject('ToastTrigger');

</script>

<template>

    <div class="text-center p-2 w-100 ps-3">
        <h3 class="mt-2 mb-4">Rysowanie <i class="bi bi-brush"></i></h3>

        <!-- Select Color Palette -->

        <InputSelectArray @action="(value) => SetPalette(value)" :options="get(ColorPalettes)"
            :selected-value="get(SelectedPalette)" aria-label="Wybór palety kolorów">
            <i class="bi bi-palette"></i> | Zmiana palety kolorów
            <bsTooltip v-if="GetSelectedPaletteOrigin() != AppName" title="Ta paleta pochodzi z innej aplikacji!">
                <i class="bi bi-exclamation-triangle-fill" :style="{color: 'red'}"></i>
            </bsTooltip>
        </InputSelectArray>

        <!-- Clear board -->
        <button class="btn btn-danger m-auto w-75" @click="ShowToast(`#ClearBoard`, { autohide: false })
        ">Wyczyść planszę <i class="bi bi-trash"></i></button>
    </div>

</template>
        
<style scoped>
div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

#ALetter {
    content: url('../../assets/A square.svg');
    vertical-align: -0.125em;
}
</style>
        