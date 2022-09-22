import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useColorPaletteStore = defineStore('ColorPaletteManager', () => {

    const AppName = ref('KP');

    const ColorPalettes = ref(useLocalStorage('ColorPalettes', [
        {
            value: 0,
            text: 'Kreatywny',
            colorSet: ['#000000', '#18C4FD', '#8B188B', '#FD1818', '#B3FD42', '#FD9618', '#D5D5D5', 'white'],
            standard: true,
            appOrigin: AppName.value,
        },
        {
            value: 1,
            text: 'Matematyczny',
            colorSet: ['#000000', '#18C4FD', '#8B188B', '#FD1818', '#f0e796', '#955629', '#D5D5D5', 'white'],
            standard: true,
            appOrigin: AppName.value,
        }
    ]));

    const BoardDefaultColor = ref(useLocalStorage('boardDefaultColor', 'white'));

    const SelectedPalette = ref(useLocalStorage('SelectedPalette', 0));

    function SetPalette(id) {
        SelectedPalette.value = id;
    }

    function AddPalette(name, colors, origin) {

        let available = ColorPalettes.value.filter(el => el.text == name).length <= 0;

        if (available) {

            ColorPalettes.value.push({
                value: ColorPalettes.value.length,
                text: name,
                colorSet: colors,
                standard: false,
                appOrigin: origin,
            });
        }
    }

    function RemovePalette(id) {

        if (ColorPalettes.value[id].standard) {
            return;
        }

        if (SelectedPalette.value === id) SelectedPalette.value = 0;

        ColorPalettes.value.splice(id, 1);
    }

    const SelectedColor = ref(null);

    function SetColorNumber(colorNumber) {
        SelectedColor.value = colorNumber;
    }

    function GetSelectedPalette() {
        return ColorPalettes.value[SelectedPalette.value].colorSet;
    }

    function GetSelectedPaletteOrigin() {
        return ColorPalettes.value[SelectedPalette.value].appOrigin;
    }

    function InterpreteColorValue(colorValue) {
        return GetSelectedPalette()[colorValue];
    }

    function InterpreteSelectedColor() {
        return GetSelectedPalette()[SelectedColor.value];
    }

    function GetSelectedColor() {
        return SelectedColor.value;
    }

    function GetBoardDefaultColorId() {
        return GetSelectedPalette().findIndex(el => el == BoardDefaultColor.value);
    }

    return {
        AppName,
        SelectedPalette,
        ColorPalettes,
        SetPalette,
        BoardDefaultColor,
        AddPalette,
        RemovePalette,

        SelectedColor,
        SetColorNumber,
        GetSelectedColor,
        GetBoardDefaultColorId,
        GetSelectedPaletteOrigin,

        InterpreteColorValue,
        InterpreteSelectedColor
    };

});