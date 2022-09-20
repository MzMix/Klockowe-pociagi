<script setup>
import { storeToRefs } from "pinia";
import { get } from '@vueuse/core';
import { getCurrentInstance, computed, ref } from "vue";

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useIndexStore } from "../../stores/IndexStore";

import { GetLetter } from "../../utils/TextUtilities";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { InterpreteColorValue } = ColorPaletteStore;

//Index
const IndexStore = useIndexStore();
const { SelectedIndexContentType } = storeToRefs(IndexStore);

const props = defineProps({
    sector: String,
});

const listId = computed(() => {
    return getCurrentInstance().vnode.key;
});

const fillColor = ref('#F2F2F2');

function ResetFillColor() {
    fillColor.value = '#F2F2F2';
}

function SetFillColor(value) {
    fillColor.value = value;
}

const content = computed(() => {

    let val = '';

    switch (get(SelectedIndexContentType)) {

        //Numeracja
        default:
        case 0:
            ResetFillColor();

            return listId.value;

        //Adresowanie
        case 1:
            ResetFillColor();

            if (props.sector === 'horizontal') val = GetLetter(listId.value - 1);
            else val = listId.value;

            return val;

        //Kolory
        case 2:
            SetFillColor(InterpreteColorValue(listId.value - 1));
            return '';

        //Brak
        case 3:
            ResetFillColor();
            return '';

    }

});

</script>

<template >
    <div class="squareOnBoard border-dark border-top border-start" :style="{ backgroundColor: fillColor }">
        {{ content }}
    </div>
</template>

<style scoped>
</style>