<script setup>
import Modal from 'bootstrap/js/src/modal'
import { useStoreWelcomeModal } from "../../stores/WelcomeStore";

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
                    <h5 class="modal-title" id="WelcomeModalLabel">Klockiem w matematykę! - <span class="text-purple">W
                            układzie z
                            klockami</span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <p>
                        Jest to pierwsza aplikacja z serii "Klockiem w matematykę!".
                    </p>

                    <hr />

                    <h6>Mozliwości aplikacji</h6>

                    <ol>

                        <li>Wypełnianie planszy kolorami przedstawiającymi klocki</li>

                        <li>Zmiana wybranego zestawu kolorów (domyślnie dostępne zestawy „Kreatyny” i
                            „Matematyczny”)
                        </li>

                        <li>Przełączanie widoku osi symetrii pozwalających podzielić planszę na ćwiartki
                        </li>

                        <li>Zmianę sposobu opisu pól na planszy:
                            <ol type="a">
                                <li>Numeracja - dwie współrzędne liczbowe na wzór układu współrzędnych
                                </li>
                                <li>Adresowanie – para litera i liczba na wzór arkusza kalkulacyjnego
                                </li>
                                <li>Kolory – para dwóch kolorów</li>
                                <li>Brak – wyłączenie opisu pól</li>
                            </ol>
                        </li>

                        <li>Zmianę zawartości pól:
                            <ol type="a">
                                <li>Brak – pola na planszy nie mają zawartości</li>
                                <li>Numeracja – każde pole ma przypisaną wartość od 1 do 100</li>
                                <li>Adresowanie – każde pole ma przypisany adres (para litera i liczba)
                                </li>
                            </ol>
                        </li>

                        <li>Zapis widoku planszy jako grafiki do pliku .png</li>
                        <li>Kodowanie rysunku – wyświetlenie listy użytych kolorów i listy pól
                            wypełnionych
                            tym
                            kolorem
                            (sposób kodowania zależy od wybranego opisu pól na planszy)</li>
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