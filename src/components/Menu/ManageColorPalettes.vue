<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'

import ExportColorPalettes from './ExportColorPalettes.vue';
import AddCustomColorPalette from './AddCustomColorPalette.vue';
import EditColorPalette from './EditColorPalette.vue';
import FileUpload from "./FileUpload.vue";

import { useColorPaletteStore } from "../../stores/ColorPaletteStore";

const ColorPaletteStore = useColorPaletteStore();
const { RemovePalette } = ColorPaletteStore;

const { ColorPalettes, BoardDefaultColor } = storeToRefs(ColorPaletteStore);

const AddPaletteKey = ref(0);
const EditColorPaletteKey = ref(0);

const PaletteToEdit = ref(null);

const PaletteToRemove = ref({
    name: '',
    value: 0
});

function editable(element) {
    return element != BoardDefaultColor.value;
}

function TriggerPaletteRemoval(paletteValue) {
    PaletteToRemove.value = {
        name: ColorPalettes.value[paletteValue].text,
        value: paletteValue
    };
}

function HandleRemovePalette(paletteValue) {

    const index = ColorPalettes.value.findIndex(object => {
        return object.value === paletteValue;
    });
    RemovePalette(index);
}

function HandleEditPalette(value) {
    PaletteToEdit.value = value;
    EditColorPaletteKey.value++;
}

</script>

<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="ManageColorPalettesModal"
        tabindex="-1" aria-labelledby="CustomPaletteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="CustomPaletteModalLabel">Zarządzaj paletami kolorów</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div v-for="cp in ColorPalettes" :key="cp.value" class="list-group-item colorPaletteEntry">

                        <div class="descriptionEntry">
                            {{ cp.text }}:
                        </div>

                        <div class="colorEntry">
                            <div v-for="cl in cp.colorSet.filter(editable)" :key="cl"
                                class="border border-dark border-2" :style="{ backgroundColor: cl }"></div>
                        </div>

                        <div class="actionEntry">
                            <button type="button" class="btn btn-info m-1" :disabled="cp.standard"
                                data-bs-toggle="collapse" data-bs-target="#editColorPalette" aria-expanded="false"
                                data-parent="#cpManager" @click="HandleEditPalette(ColorPalettes.indexOf(cp))">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal"
                                data-bs-target="#RemovePaletteModal" :disabled="cp.standard"
                                @click="TriggerPaletteRemoval(cp.value)">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>


                    <div class="inputAndOpenCreator mt-2 mb-2">
                        <div>
                            <FileUpload />
                        </div>

                        <div>
                            <label for="ExportPaletteBtn" class="form-label col-auto">Eksportuj własne palety kolorów:
                            </label>
                            <div id="ExportPaletteBtn">
                                <ExportColorPalettes :UseIcon="true" />
                            </div>
                        </div>

                        <div class="d-flex flex-column">
                            <label for="paletteCreatorBtn" class="form-label col-auto">Dodaj własne palety kolorów:
                            </label>
                            <button type="button" class="btn btn-primary" id="paletteCreatorBtn"
                                data-bs-toggle="collapse" data-bs-target="#addCustomPalette" aria-expanded=" false"
                                aria-controls="addCustomPalette" @click="AddPaletteKey++">
                                Otwórz kreator palet kolorów <i class="bi bi-palette"></i>
                            </button>
                        </div>
                    </div>

                    <div class="collapse mt-4" id="addCustomPalette">
                        <div class="card card-body">
                            <AddCustomColorPalette :key="AddPaletteKey" />
                        </div>
                    </div>

                    <div class="collapse mt-4" id="editColorPalette">
                        <div class="card card-body">
                            <EditColorPalette :key="EditColorPaletteKey" :id="PaletteToEdit" />
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="RemovePaletteModal" tabindex=" -1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="RemovePaletteModalLabel">Czy na pewno chcesz usunąć paletę:
                        {{ PaletteToRemove.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Tej akcji <strong>nie będzie</strong> można cofnąć! Aby potwierdzić operację kliknij poniższy
                        przycisk:</p>
                </div>
                <div class="modal-footer">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="HandleRemovePalette(PaletteToRemove.value)"> <i class="bi bi-trash3"></i>
                            Tak, usuń</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.colorPaletteEntry {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    text-align: left;
}

.descriptionEntry {
    text-align: left;
}

.colorEntry {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    column-gap: 0.5em;
    row-gap: 0.5em;
    padding-left: 1.5em;
}

.colorEntry div {
    aspect-ratio: 1/1;
    width: 2em;
    height: 2em;
    border-radius: 10%;
}

.actionEntry {
    text-align: right;
}

.inputAndOpenCreator {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1em;
    justify-content: space-around;
    align-items: flex-end;
}
</style>