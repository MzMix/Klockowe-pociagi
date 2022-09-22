<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from 'pinia';
import { get } from '@vueuse/core';
import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';

import { useColorPaletteStore } from "@Stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { ColorPalettes, BoardDefaultColor } = storeToRefs(ColorPaletteStore);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    }
});

const paletteId = computed(() => {
    if (props.id == null || props.id == undefined) {
        return 0;
    } else {
        return props.id;
    }
});

const PaletteColors = ref(ColorPalettes.value[paletteId.value].colorSet);
const editedColorId = ref(0);
const pickerColor = ref(PaletteColors.value[0]);

const pickerKey = ref(0);

function openPicker(colorId) {
    editedColorId.value = colorId;
    pickerKey.value++;
    pickerColor.value = get(PaletteColors)[editedColorId.value];
}

function changeColor(color) {
    const hex = color.hex;
    PaletteColors.value[get(editedColorId)] = hex;
}

function editable(element) {
    return element != BoardDefaultColor.value;
}

</script>

<template>
    <div>
        <h4>Edycja palety kolorów: </h4>

        <div class="paletteForm mt-4">

            <form @submit.prevent="onSubmit">
                <div class="formInputs">
                    <div class="p-1"> <label for="paletteName" class="form-label">Nazwa palety kolorów:
                        </label>
                    </div>
                    <div> <input type="text" class="form-control w-100" id="paletteName"
                            v-model="ColorPalettes[paletteId].text">
                    </div>
                </div>

                <div class="mt-4 colorEntry p-2">
                    <div v-for="cl in PaletteColors.filter(editable)" :key="cl"
                        class="border border-dark border-2 position-relative" :style="{ backgroundColor: cl }"
                        @click="openPicker(PaletteColors.indexOf(cl))">
                        <span v-if="editedColorId === PaletteColors.indexOf(cl)"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            :style="{ zIndex: 2 }"> <i class="bi bi-pencil-fill"></i>
                        </span>
                    </div>
                </div>
            </form>

            <div>
                <ColorPicker theme="light" :color="pickerColor" :sucker-hide="true" :colors-default="PaletteColors"
                    @changeColor="changeColor" :key="pickerKey" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.paletteForm {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-items: center;
}

.formInputs {
    display: flex;
    flex-direction: row;
    column-gap: 1em;
    flex-wrap: wrap;
}

.paletteForm form {
    place-self: stretch center;
}

.colorEntry {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 0.5em;
    row-gap: 0.5em;
}

.colorEntry div {
    aspect-ratio: 1/1;
    width: 4em;
    height: 4em;
    border-radius: 10%;
}
</style>

<style>
.hu-color-picker {
    box-sizing: content-box;
}

.color-set {
    justify-content: space-around;
}

.color-show {
    align-content: center;
    margin-bottom: 1em;
}

.color-show canvas {
    width: 95% !important;
}

.colors .item:nth-child(8n+1) {
    margin-left: 10px;
}

.color-alpha {
    display: none !important;
}
</style>
