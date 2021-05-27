let loadedFile;

function handleFile(file) {

    if (file.type == 'application' && file.subtype == 'json') {

        let fileData = file.data;
        loadJSON(fileData, action.updateColors, action.rejectedFile);

    }
}

function addMethodsToObjects() {

    userInterface.generateColorContrainer = function () {
        this.palette = [];
        this.pickedColor = '';
        select(".colorSchemeContainer").html("")

        for (let col of settings.colorSchemes[settings.activeColorScheme]) {

            let div = createDiv();

            div.addClass('paletteBtn');
            div.style('background-color', col);
            div.size(1.2 * settings.squareSize, 1.2 * settings.squareSize);
            div.attribute("onclick", `userInterface.pickColor('${col}')`);
            select(".colorSchemeContainer").child(div);
            this.palette.push(div);
        }
        return this;
    }

    UserInterface.prototype.addCustomColorSet = function () {
        print('tak');
        let newColorSet = [];

        for (let i = 0; i < settings.colorMatrix.length; i++) {
            let picker = select(`.picker${i}`);

            newColorSet.push(picker.value());
        }
        newColorSet.push('#C0C0C0');

        settings.colorSchemes.push(newColorSet);
        action.refreshColorSets();

        let val;
        for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
            val = `Zestaw ${i+1}`;
        }
        settings["currentColorScheme"] = val;
        action.switchColorScheme(true);
    }


    userInterface.pickColor = function (color) {
        this.pickedColor = color;
        settings.selectingStarted = false;
    }

    Segment.prototype.changeContent = function (val) {
        if (val) {
            this.txt = val;
        } else {
            this.txt = this.basicContent;
        }
    }
    Segment.prototype.basicContent = "";

    Segment.prototype.changeColor = function (val) {
        if (val) {
            this.fill = val;
        } else {
            this.fill = this.basicFillColor;
        }
    }
    Segment.prototype.basicFillColor = settings.squareFill;
    Segment.prototype.basicStrokeColor = settings.squareStroke;

    Segment.prototype.colorSegment = function () {

        if (userInterface.pickedColor && (!settings.selectingStarted)) {
            settings.selectingStarted = !settings.selectingStarted;
            settings.selectedStartingSeg = this;
            settings.filling = userInterface.pickedColor;

            this.changeContent("S");
            this.changeColor(settings.filling);
        } else {
            settings.selectingStarted = !settings.selectingStarted;
            settings.selectedStartingSeg.changeContent();
            this.changeColor(settings.filling);

            if ((settings.selectedStartingSeg.posKart.x == this.posKart.x) && (settings.selectedStartingSeg.posKart.y == this.posKart.y)) {} else if (settings.selectedStartingSeg.posKart.x == this.posKart.x) {

                if (settings.selectedStartingSeg.num < this.num) {

                    for (let i = settings.selectedStartingSeg.num; i < this.num; i++) {
                        userInterface.board[i].changeColor(settings.filling);
                    }

                } else {

                    for (let i = settings.selectedStartingSeg.num - 1; i >= this.num; i--) {
                        userInterface.board[i].changeColor(settings.filling);
                    }

                }

            } else if (settings.selectedStartingSeg.posKart.y == this.posKart.y) {

                if (settings.selectedStartingSeg.posKart.x > this.posKart.x) {

                    for (let i = settings.selectedStartingSeg.posKart.x; i >= this.posKart.x; i--) {

                        for (let segment of userInterface.board) {
                            if (segment.posKart.x == i && segment.posKart.y == settings.selectedStartingSeg.posKart.y) segment.changeColor(settings.filling);
                        }

                    }
                } else {

                    for (let i = settings.selectedStartingSeg.posKart.x; i < this.posKart.x; i++) {

                        for (let segment of userInterface.board) {
                            if (segment.posKart.x == i && segment.posKart.y == settings.selectedStartingSeg.posKart.y) segment.changeColor(settings.filling);
                        }

                    }

                }
            }
        }

    }

}

action.updateColors = function (givenJson) {

    if (givenJson.setsOfColors.length > 2) {
        //Mamy dodaną własną paletę

        for (let i = 2; i < givenJson.setsOfColors.length; i++) {
            settings.colorSchemes.push(givenJson.setsOfColors[i].colors);
        }

    }
    action.refreshColorSets
}

action.rejectedFile = function () {
    alert("Wybrano nieprawidłowy plik!");
}

action.showModal = function (value) {
    let el;
    select(".modal-dialog").html("");

    switch (value) {
        case 'changeColorSet':

            templatka = templateHTML.querySelector("#changeColorSet");
            clone = templatka.content.cloneNode(true);
            insert = clone.querySelector(".modal-content");
            select(".modal-dialog").child(insert);

            this.refreshColorSets();

            el = createSelect();
            el.option("Domyślny");
            for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
                el.option(`Zestaw ${i+1}`);
            }
            if (settings.currentColorScheme) el.value(settings.currentColorScheme);
            el.addClass("custom-select switchColorScheme");
            el.changed(this.switchColorScheme);
            select(".modal-body").child(el);

            break;

        case 'addCustomColorSet':
            $('#modal').modal('show');

            templatka = templateHTML.querySelector("#addCustomColorSet");
            clone = templatka.content.cloneNode(true);
            insert = clone.querySelector(".modal-content");
            select(".modal-dialog").child(insert);

            for (let col of settings.colorMatrix) {

                let num = 1 + settings.colorMatrix.indexOf(col)
                if (num < 10) num = '0' + num.toString();
                let el = createP(`Kolor ${num}: `);

                let picker = createColorPicker(col);

                picker.addClass(`colorPicker picker${settings.colorMatrix.indexOf(col)}`);

                picker.parent(el);
                select(".modal-body").child(el);
            }
            break;

        case 'loadColorsFromFile':
            $('#modal').modal('show');

            templatka = templateHTML.querySelector("#loadColorsFromFile");
            clone = templatka.content.cloneNode(true);
            insert = clone.querySelector(".modal-content");
            select(".modal-dialog").child(insert);

            let input = createFileInput(handleFile, false);
            input.attribute("accept", "application/json");

            select(".modal-body").child(input);

            break;

        default:
            break;
    }
}

action.refreshColorSets = function () {
    settings.colorsSchemesInList = [];
    for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
        settings.colorsSchemesInList.push(`Zestaw ${i+1}`);
    }
}

action.switchColorScheme = function (dontChange) {

    if (dontChange != true) settings["currentColorScheme"] = select(".switchColorScheme").value();

    if (settings.currentColorScheme == "Domyślny") {
        settings.activeColorScheme = 0;
    } else {
        let pos = settings.colorsSchemesInList.indexOf(settings.currentColorScheme);
        pos++;

        settings.activeColorScheme = pos;
    }

    for (let s of userInterface.board) {
        s.changeColor(settings.colorSchemes[settings.activeColorScheme][s.txt - 1])
    }

    userInterface.generateColorContrainer();
}

settings.addValues({
    activeColorScheme: 0,
    selectingStarted: false
})

action.saveColorSets = function () {

    let json = {};
    let listOfSets = [];
    let colorsToSave = [];

    for (let i = 0; i < settings.colorSchemes.length; i++) {

        for (let color of settings.colorSchemes[i]) {
            if (color != "#C0C0C0") colorsToSave.push(color)
        }

        name = `set${i}`;

        listOfSets.push({
            name: name,
            colors: colorsToSave
        });

        colorsToSave = [];
    }

    json.setsOfColors = listOfSets;
    saveJSON(json, "kolory");
}

function formatSingleDigitNumber(number) {

    if (number >= 10) {
        return number;
    } else {
        number = '0' + number;
        return number;
    }

}

action.saveImg = function () {
    let data = new Date();

    let year, month, day, hours, minutes, seconds;
    year = data.getFullYear();
    month = data.getMonth() + 1;
    day = data.getDate();
    hours = data.getHours();
    minutes = data.getMinutes();
    seconds = data.getSeconds();

    saveCanvas(`plansza-${formatSingleDigitNumber(year)}-${formatSingleDigitNumber(month)}-${formatSingleDigitNumber(day)}-${formatSingleDigitNumber(hours)}-${formatSingleDigitNumber(minutes)}-${formatSingleDigitNumber(seconds)}`, 'png');
}

action.hideColorPalette = function () {

    let colPal = select(".colorSchemeContainer")
    let canvas = select(".canvasDiv")

    if (colPal.style('display') === "none") {
        colPal.removeClass("invisible");
        canvas.style("margin", "0");
    } else {
        colPal.addClass("invisible");
        canvas.style("margin", "0 auto 0 auto");
    }

}

action.resetBoard = function () {
    for (let s of userInterface.board) {
        if (!(s instanceof Index)) {
            s.changeColor();
        }
    }
}

action.resetBoard = function () {
    for (let s of userInterface.board) {
        s.retriveBasicValues()
        s.changeColor();
    }
}

settings.colorSchemes = [
    ['black', 'deepskyblue', 'purple', 'red', 'greenyellow', 'darkorange', '#D3D3D3'],
    ['red', 'green', 'blue', 'yellow', 'pink', 'gray', '#D3D3D3']
];

settings.colorMatrix = settings.colorSchemes[1];
settings.colorMatrix.pop();

function setup() {
    addMethodsToObjects();

    userInterface.createInterface().generateBoard().generateColorContrainer();
    for (let segment of userInterface.board) {
        segment.display();
    }
    noLoop();
}

function draw() {
    userInterface.refreshBoard();
    for (let segment of userInterface.board) {
        segment.display();
    }
}

function mouseClicked() {
    userInterface.checkBoardClicks();
    redraw();
}