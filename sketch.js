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

        case "addColorScheme":
            select(".modal-title").html("Dodaj nowy zestaw");

            for (let col of settings.colorSchemes[settings.activeColorScheme]) {
                let el = createDiv();
                el.addClass("paletteBtn");
                el.style("background-color", col);
                el.size(1.2 * settings.squareSize, 1.2 * settings.squareSize);
                el.mousePressed(action.newColor(settings.colorSchemes[settings.activeColorScheme].indexOf(col)));
                select(".modal-body").child(el);
            }

            select(".modal-body").html("");
            break;

        default:
            break;
    }
}

action.newSet = function () {
    action.showModal('addColorScheme')
}

action.refreshColorSets = function () {
    settings.colorsSchemesInList = [];
    for (let i = 0; i < settings.colorSchemes.length - 1; i++) {
        settings.colorsSchemesInList.push(`Zestaw ${i+1}`);
    }
}

action.switchColorScheme = function () {
    settings["currentColorScheme"] = select(".switchColorScheme").value();

    if (settings.currentColorScheme == "Domyślny") {
        settings.activeColorScheme = 0;
        userInterface.generateColorContrainer()
    } else {
        let pos = settings.colorsSchemesInList.indexOf(settings.currentColorScheme);
        pos++;

        settings.activeColorScheme = pos;
        userInterface.generateColorContrainer()
    }

}

settings.addValues({
    activeColorScheme: 0,
    selectingStarted: false
})

action.saveImg = function () {
    let data = new Date();
    saveCanvas(`plansza-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
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

settings.colorSchemes = [
    ['black', 'deepskyblue', 'purple', 'red', 'greenyellow', 'darkorange', '#D3D3D3']
];

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