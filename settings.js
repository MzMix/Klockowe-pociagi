class PresetSettings {
    constructor() {
        this.squareSize = 45;
        this.squareSpacer = 0;
        this.squaresBySideH = 8;
        this.squaresBySideW = 16;

        this.squareCurvature = 1;

        this.squareFill = '#D3D3D3';
        this.squareStroke = color(255, 255, 255, 125);
        this.squareTextColor = "white";
        this.squareTextStrokeColor = "black";

        this.squareTextSize = 15;
        this.squareTextWeight = 0;

        this.hasIndex = false;
    }

    addValues(valueObj) {
        for (const el in valueObj) {
            this[el] = valueObj[el];
        }
    }
}

const settings = new PresetSettings();