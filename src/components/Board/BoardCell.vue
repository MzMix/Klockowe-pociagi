<script setup>
//Import from Vue, Pinia
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";

//Import Stores
import { useColorPaletteStore } from "@Stores/ColorPaletteStore";
import { useBoardStore } from "@Stores/BoardStore";

//Import Utils
import { GetId, ComparePosition, ReturnCellId, CalculateBoardPosition } from "@Utils/CalculatePositionAndId";
import { GetTextColorOnBackground } from "@Utils/TextUtilities";

//Color & Palette
const ColorPaletteStore = useColorPaletteStore();
const { GetSelectedColor, InterpreteColorValue, GetBoardDefaultColorId } = ColorPaletteStore;

//Board
const BoardStore = useBoardStore();
const { SaveToBoard, GetCellValue, StartSelection, EndSelection } = BoardStore;
const { SelectionStartPosition, SelectionStarted } = storeToRefs(BoardStore);

const props = defineProps({
    cellId: Number,
});

const content = ref(false);

//callback: (i)=>{}
function TwoWayWhile(start, end, callback) {
    let i = start;
    while (i !== end) {
        callback(i);
        i += start < end ? 1 : -1;
    }

}

function ColorCell() {

    //Selection didn't start -> start new selection
    if (!isNaN(GetSelectedColor()) && GetSelectedColor() >= 0 && !SelectionStarted.value) {
        //Start Selection
        StartSelection();
        SelectionStartPosition.value = PositionBoard.value;

        //Color Starting Cell
        let selectedColor = GetSelectedColor();
        if (selectedColor == undefined || selectedColor == null) return;
        SaveToBoard(props.cellId, selectedColor);
        content.value = true;
    }
    //selection did start -> end selection
    else {
        //End selection
        EndSelection();

        //Color Ending Cell
        let selectedColor = GetSelectedColor();
        if (selectedColor == undefined || selectedColor == null) return;
        SaveToBoard(props.cellId, selectedColor);

        switch (ComparePosition(PositionBoard.value, SelectionStartPosition.value)) {

            default:
            case 'Equal':
                break;

            case 'SAME_X':
                TwoWayWhile(PositionBoard.value.y, SelectionStartPosition.value.y, (i) => {
                    SaveToBoard(ReturnCellId({
                        x: PositionBoard.value.x,
                        y: i
                    }), selectedColor);
                });
                break;

            case 'SAME_Y':

                TwoWayWhile(PositionBoard.value.x, SelectionStartPosition.value.x, (i) => {
                    SaveToBoard(ReturnCellId({
                        x: i,
                        y: PositionBoard.value.y
                    }), selectedColor);
                });

                break;

        }

    }
}

const PositionBoard = computed(() => {
    let id = new Number(props.cellId);
    return CalculateBoardPosition(id);
});

const CellColor = computed(() => {
    let boardValue = GetCellValue(props.cellId);
    if (boardValue === null) boardValue = GetBoardDefaultColorId();
    return InterpreteColorValue(boardValue);
});

const TextColor = computed(() => {
    return GetTextColorOnBackground(CellColor.value);
});

watch(SelectionStarted, () => {
    if (!SelectionStarted.value) content.value = false;
});
</script>

<template>
    <div class="squareOnBoard border-top border-dark border-start" @click="ColorCell()"
        @contextmenu.prevent="SaveToBoard(props.cellId, GetBoardDefaultColorId())"
        :style="{ backgroundColor: CellColor, color: TextColor }" :id="GetId(PositionBoard)">
        <i v-if="content" class="bi bi-pin-angle"></i>
    </div>
</template >

<style scoped>
div {
    font-size: .75rem;
}
</style>