<script setup>
import Modal from 'bootstrap/js/src/modal'
import { useStoreWelcomeModal } from "@Stores/WelcomeStore";

const store = useStoreWelcomeModal();
const { ShowWelcome, DesibleWelcome } = store;

document.addEventListener("DOMContentLoaded", function () {
    if (!ShowWelcome) return;
    var WelcomeModal = new Modal(document.getElementById('WelcomeModal'))
    WelcomeModal.show();
});
</script>

<template>
    <div class="modal fade" id="WelcomeModal" tabindex="-1" aria-labelledby="WelcomeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="WelcomeModalLabel">Klockiem w matematykę! - <span
                            class="text-purple">Klockowe pociągi</span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <p>
                        Jest to trzecia aplikacja z serii "Klockiem w matematykę!".
                    </p>

                    <hr />

                    <h6>Mozliwości aplikacji</h6>

                    <ol>

                        <li>Wypełnianie planszy kolorami przedstawiającymi klockowe wieżowce</li>

                        <li>Zmiana wybranego zestawu kolorów (domyślnie dostępne zestawy „Kreatyny” i „Matematyczny”)
                        </li>

                        <li>Zapis widoku planszy jako grafiki do pliku .png</li>

                        <li>Modyfikowanie zestawów kolorów:
                            <ol type="a">
                                <li>Dodawanie własnego zestawu z własną nazwą i listą kolorów</li>
                                <li>Edycja dodanych zestawów (nie dotyczy zestawów domyślnych)</li>
                                <li>Usuwanie dodanych zestawów (nie dotyczy zestawów domyślnych)</li>
                                <li>Eksport listy zestawów kolorów do pliku .json</li>
                                <li>Import listy kolorów z pliku .json</li>
                            </ol>
                        </li>

                    </ol>

                </div>
                <div class="modal-footer">
                    <button @click="DesibleWelcome()" type="button" class="btn btn-outline-primary"
                        data-bs-dismiss="modal">Nie pokazuj ponownie</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
                </div>
            </div>
        </div>
    </div>
</template>