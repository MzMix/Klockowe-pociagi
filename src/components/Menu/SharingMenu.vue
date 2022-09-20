<script setup>
//Import components
import ExportColorPalettes from './ExportColorPalettes.vue';

//Import Utils
import { DownloadCanvas, GetDateForFileName } from '../../utils/SharingUtilities';
import html2canvas from 'html2canvas';

//Import Pinia Store
import { storeToRefs } from "pinia";
import { useBoardStore } from "../../stores/BoardStore";

//Board Store
const BoardStore = useBoardStore();
const { BoardName } = storeToRefs(BoardStore);

function SaveBoard(includeTitle = true) {
    html2canvas(document.getElementById('BoardOuterContainer'), {
        backgroundColor: null,
        scale: 4,
        imageTimeout: 0,
        windowWidth: 1444,
        onclone: function (cloneDoc) {

            //Footer
            cloneDoc.getElementById('BoardOuterContainer').insertAdjacentHTML("beforeend",
                `<div style="width: 100%; color: #000; -webkit-text-stroke: 0.1px #fff; display: inline-block; text-align: center; font-size: 0.75em;">Grafika stworzona w aplikacji "W układzie z klockami" | ${GetDateForFileName()}</div><br/>`);

            if (!includeTitle) return;

            //Title
            cloneDoc.getElementById('BoardOuterContainer').insertAdjacentHTML("afterbegin",
                `<div style="width: 100%; color: #000; -webkit-text-stroke: 1px #fff; display: inline-block; text-align: center; font-size: 2em;">${BoardName.value}</div><br/>`);
        }
    }).then(function (canvas) {
        DownloadCanvas(canvas, `plansza-${GetDateForFileName()}`);
    });
}

</script>

<template>
    <div class="text-center p-2 w-100 ps-3">

        <h3 class="mt-2 mb-4">Udostępnianie <i class="bi bi-share"></i></h3>

        <ExportColorPalettes />

        <hr />

        <div class="btn-group">

            <button class="btn btn-outline-primary" type="button" @click="SaveBoard(true)">
                Zapis zdjęcia planszy do pliku
            </button>

            <button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="SaveBoard(false)">Zapisz zdjęcie planszy bez tytułu</a></li>
            </ul>

        </div>

    </div>
</template>

<style scoped>

</style>