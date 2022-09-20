import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoardStore = defineStore('BoardManager', () => {

    const BoardFill = ref(useLocalStorage("BoardFill", new Array(128).fill(null)));

    const BoardName = ref(useLocalStorage("BoardName", "Nowa Plansza"));

    const SelectionStarted = ref(false);

    const SelectionStartPosition = ref(null);
    const SelectionStartID = ref(null);

    function SaveToBoard(id, value) {
        let i = id - 1;
        BoardFill.value[i] = value;
    }

    function ClearBoard() {
        BoardFill.value.fill(7);
    }

    function GetCellValue(id) {
        let i = id - 1;
        return BoardFill.value[i];
    }

    function StartSelection(id) {
        SelectionStarted.value = true;
        SelectionStartPosition.value = id
    }

    function EndSelection() {
        SelectionStarted.value = false;
    }

    return {
        BoardFill,
        BoardName,
        SelectionStartPosition,
        SelectionStarted,
        SelectionStartID,

        SaveToBoard,
        ClearBoard,
        GetCellValue,
        StartSelection,
        EndSelection
    };

});