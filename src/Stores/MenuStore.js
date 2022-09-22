import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('MenuMenager', () => {

    const MenuOpened = ref(0);

    const ShowLeaveWarn = ref(useLocalStorage("ShowLeaveWarn", true));

    function SwitchMenu(value) {
        if (value >= 0 && value <= 3) MenuOpened.value = value;
        else console.warn("Attempt of opening non existing menu!");
    }

    function ToogleLeaveWarn() {
        ShowLeaveWarn.value = !ShowLeaveWarn.value;

        if (!ShowLeaveWarn.value) {
            window.onbeforeunload = null;
        } else {
            window.onbeforeunload = function () {
                return 'Are you sure you want to leave?';
            };
        }

    }

    return {
        MenuOpened,
        ShowLeaveWarn,

        SwitchMenu,
        ToogleLeaveWarn
    };

});