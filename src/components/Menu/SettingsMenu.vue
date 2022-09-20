<script setup>
import { storeToRefs } from "pinia";

import Modal from 'bootstrap/js/src/modal'
import ManageColorPalettesModal from "./ManageColorPalettes.vue";

import { useStoreWelcomeModal } from "../../stores/WelcomeStore";
import { useBoardStore } from "../../stores/BoardStore";
import { useMenuStore } from '../../stores/MenuStore'

//Welcome modal
const WelcomeModalStore = useStoreWelcomeModal();
const { ShowWelcome } = storeToRefs(WelcomeModalStore);
const { ToogleWelcome } = WelcomeModalStore;

//Menu
const MenuStore = useMenuStore();
const { ShowLeaveWarn } = storeToRefs(MenuStore);
const { ToogleLeaveWarn } = MenuStore;

//Board
const BoardStore = useBoardStore();
const { ToogleBoardHighlight } = BoardStore;
const { UseBoardHighlight } = storeToRefs(BoardStore);

function showModal() {
    var CustomPaletteModal = new Modal(document.getElementById('ManageColorPalettesModal'))
    CustomPaletteModal.show();
}

function ClearData() {
    localStorage.clear();
    document.location.reload(true);
}

</script>

<template>
    <div class="text-center p-2 w-100 ps-3">
        <h3 class="mt-2 mb-4">Ustawienia <i class="bi bi-gear"></i></h3>

        <button class="btn btn-outline-primary" @click="showModal()">Zarządzaj paletami kolorów</button>

        <hr />

        <button class="btn btn-outline-primary" @click="ToogleWelcome()">
            <span v-if="ShowWelcome">Nie pokazuj panelu powitalnego</span>
            <span v-if="!ShowWelcome">Pokazuj panel powitalny</span></button>

        <hr />

        <button class="btn btn-outline-primary" @click="ToogleBoardHighlight()">
            <span v-if="UseBoardHighlight">Wyłącz podświetlanie komórek</span>
            <span v-if="!UseBoardHighlight">Włącz podświetlanie komórek</span>
        </button>

        <hr>

        <button class="btn btn-outline-primary" @click="ToogleLeaveWarn()">
            <span v-if="ShowLeaveWarn">Wyłącz ostrzeżenie przed wyjściem</span>
            <span v-if="!ShowLeaveWarn">Włącz ostrzeżenie przed wyjściem</span>
        </button>

        <hr />

        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ClearDataModal">Usuń dane
            aplikacji</button>

        <ManageColorPalettesModal />

        <div class="modal fade" id="ClearDataModal" tabindex=" -1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ClearDataModalLabel">Czy na pewno chcesz wyczyścić dane
                            aplikacji
                            zapisane w pamięci przeglądarki?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="">
                            Wszystkie dane zapisane w pamięci przeglądarki zostaną <strong>usunięte</strong> (własne
                            palety
                            kolorów,
                            ustawienia, obecny stan planszy).
                        </p>
                        <p>Tej akcji <strong>nie będzie</strong> można cofnąć! Aby potwierdzić operację kliknij
                            poniższy
                            przycisk:</p>
                    </div>
                    <div class="modal-footer">
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="ClearData()">
                                <i class="bi bi-trash3"></i>
                                Tak, usuń</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>