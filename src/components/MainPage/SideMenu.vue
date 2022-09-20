<script setup>
import ColorSelectionArea from '../Menu/ColorSelectionArea.vue'
import SettingsMenu from '../Menu/SettingsMenu.vue';
import DrawingMenu from '../Menu/DrawingMenu.vue'
import SharingMenu from '../Menu/SharingMenu.vue';

import { useMenuStore } from "../../stores/MenuStore";
import { storeToRefs } from 'pinia';

const MenuStore = useMenuStore();
const { MenuOpened } = storeToRefs(MenuStore);
</script>

<template>
    <div class="border-end border-dark h-100 position-relative overflow-x-hidden overflow-y-scroll">

        <Transition name="slide-up">
            <ColorSelectionArea v-if="MenuOpened == 0" class="position-absolute" />
            <DrawingMenu v-else-if="MenuOpened == 1" class="position-absolute" />
            <SharingMenu v-else-if="MenuOpened == 2" class="position-absolute" />
            <SettingsMenu v-else-if="MenuOpened == 3" class="position-absolute" />
        </Transition>

    </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #0b5ed7 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 16px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: #0b5ed7;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

/* ===== Resize Handle CSS ===== */
::-webkit-resizer {
    background-color: #ffffff;
    background: url("../../assets/grip-vertical.svg") no-repeat;
    padding-bottom: 10px;
}
</style>