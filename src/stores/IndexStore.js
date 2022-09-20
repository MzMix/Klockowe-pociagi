import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIndexStore = defineStore('IndexManager', () => {

    const IndexContentTypes = ref([
        {
            value: 0,
            text: 'Numeracja'
        },
        {
            value: 1,
            text: 'Adresowanie'
        },
        {
            value: 2,
            text: 'Kolory'
        },
        {
            value: 3,
            text: 'Brak'
        }
    ]);

    const SelectedIndexContentType = ref(useLocalStorage("SelectedIndexContentType", 0));

    function SetIndexContentType(value) {
        SelectedIndexContentType.value = value;
    }

    return {
        IndexContentTypes,
        SelectedIndexContentType,
        SetIndexContentType,
    };

});