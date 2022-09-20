<script setup>
import { computed } from "vue";

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";
import { useBoardStore } from "../../stores/BoardStore";

import { CalculatePosition, GetId, /*CalculateBoardPosition*/ } from "../../utils/CalculatePositionAndId";
import { GetTextColorOnBackground } from "../../utils/TextUtilities";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { GetSelectedColor, InterpreteColorValue, GetBoardDefaultColorId, BoardDefaultColor } = ColorPaletteStore;

//Board
const BoardStore = useBoardStore();
const { SaveToBoard, GetCellValue } = BoardStore;

const props = defineProps({
    cellId: Number,
});

function ColorCell() {

    let selectedColor = GetSelectedColor();

    if (selectedColor == undefined || selectedColor == null) return;

    if (GetCellValue(props.cellId) === selectedColor) {
        selectedColor = BoardDefaultColor;
    }

    SaveToBoard(props.cellId, selectedColor)
}

const PositionCCS = computed(() => {
    let id = new Number(props.cellId);
    return CalculatePosition(id);
});

// const PositionBoard = computed(() => {
//     let id = new Number(props.cellId);
//     return CalculateBoardPosition(id);
// });

const content = computed(() => {

    return '';

});

const CellColor = computed(() => {
    let boardValue = GetCellValue(props.cellId);
    if (boardValue === null) boardValue = GetBoardDefaultColorId();
    return InterpreteColorValue(boardValue);
});

const TextColor = computed(() => {
    return GetTextColorOnBackground(CellColor.value);
})


</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        @contextmenu.prevent="SaveToBoard(props.cellId, GetBoardDefaultColorId())"
        :style="{ backgroundColor: CellColor, color: TextColor }" :id="GetId(PositionCCS)">
        {{ content }}
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>