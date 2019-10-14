new p5;

function preload() {
    settings.menuJsonPattern = loadJSON("./sideMenu.json", () => {
        console.log("Plik JSON załadowany pomyślnie!");
    }, () => {
        alert("Wystąpił bład! Nastąpi przekierowanie do strony głównej!");
        window.location.href = "https://mzmix.github.io/";
    }, "json")
}

Number.prototype.between = function (a, b) {
    let minVal = min([a, b]);
    let maxVal = max([a, b]);

    return this > minVal && this < maxVal;
};

function getLettersFromAlphabet() {
    const letters = (() => {
        return [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    })();

    return letters;
}

function merge2Objects(obj1, obj2) {
    return {
        ...obj1,
        ...obj2
    };
}

class Action {
    showModal() {}
}

const action = new Action();

class UserInterface {

    constructor() {
        this.executeQueue = {};
        this.modalOpened = false;
    }

    createInterface() {
        let sizeW = settings.squareSize * (settings.squaresBySideW + 2) + 11 * settings.squareSpacer + 6;
        let sizeH = settings.squareSize * (settings.squaresBySideH + 2) + 11 * settings.squareSpacer + 6;
        this.canvas = createCanvas(sizeW, sizeH).parent(select('.canvasDiv'));

        this.generateSideMenu();

        return this;
    }

    generateSideMenu() {
        try {
            const data = settings.menuJsonPattern;

            //Obiekt przechowujący elementy menu
            const SideMenu = {};
            Object.keys(data).forEach((key) => {
                SideMenu[key] = '';
            });

            Object.keys(SideMenu).forEach((element) => {
                let el, sectionContent;

                // print(data[element][0]);

                switch (data[element][0].type) {
                    case "menuHeader":
                        sectionContent = data[element][0].content;

                        if (/\<(.*?)\>/.test(sectionContent) && /\((.*?)\)/.test(sectionContent)) {
                            sectionContent = createA(content.match(/\<(.*?)\>/)[1], content.match(/\((.*?)\)/)[1]);
                        } else {
                            sectionContent = createSpan(sectionContent);
                        }

                        el = createElement('h3');
                        el.child(sectionContent)

                        if (data[element][0].class) el.addClass(data[element][0].class)
                        el.parent(select('.sidebar-header'));

                        break;

                    case "menuContent":
                        sectionContent = data[element][0].content;

                        for (const [name, action] of Object.entries(sectionContent)) {
                            let title = action[0];
                            let fxn = action[1];

                            let a = createA(`#submenu${name}`, `${name}`);

                            a.addClass("dropdown-toggle");
                            a.attribute("data-toggle", "collapse");
                            a.attribute("aria-expanded", "false");

                            a.parent(select(".sidebar-content"));

                            let ul = createElement("ul");
                            ul.addClass("collapse");
                            ul.addClass("list-unstyled");
                            ul.id(`submenu${name}`);


                            if (title.length != fxn.length) {
                                throw "JSON Syntax error! See documentation for help."
                            }

                            for (let i = 0; i < title.length; i++) {
                                let e = createElement("li");

                                let anch = createA("#", title[i]);
                                anch.attribute("onclick", fxn[i]);
                                anch.parent(e);

                                e.addClass("menuOption");

                                if (fxn[i].includes("action.showModal(")) {
                                    anch.attribute("data-toggle", "modal")
                                    anch.attribute("data-target", "#modal")
                                }

                                e.parent(ul);
                            }

                            ul.parent(select(".sidebar-content"));
                        }


                        break;

                    case "menuFooter":
                        sectionContent = data[element][0].content;

                        if (/\<(.*?)\>/.test(sectionContent) && /\((.*?)\)/.test(sectionContent)) {
                            sectionContent = createA(sectionContent.match(/\<(.*?)\>/)[1], sectionContent.match(/\((.*?)\)/)[1]);
                        } else {
                            sectionContent = createSpan(sectionContent);
                        }

                        el = createElement('h3');
                        el.child(sectionContent)

                        if (data[element][0].class) el.addClass(data[element][0].class)
                        el.parent(select('.sidebar-footer'));
                        break;

                    default:
                        throw new Error("Bład w składni pliku sideMenu.json");
                }

            });

        } catch (e) {
            console.error(e);
        }

    }

    generateBoard() {

        this.board = [];
        let total = 1;

        for (let y = 0; y < settings.squaresBySideH + 2; y++) {
            for (let x = 0; x < settings.squaresBySideW + 2; x++) {

                let iteratorIndex = {
                    x: x,
                    y: y
                }

                let posKart = {
                    x: y - (settings.squaresBySideH + 2) / 2,
                    y: -x + (settings.squaresBySideW + 2) / 2
                }

                if (((y == 0 || y == settings.squaresBySideH + 1) && x > 0 && x < settings.squaresBySideW + 1) ||
                    ((x == 0 || x == settings.squaresBySideW + 1) && y > 0 && y < settings.squaresBySideH + 1)) {
                    //Index
                    if (settings.hasIndex) this.board.push(new Index(iteratorIndex, posKart, total));
                } else if (y != 0 && y != settings.squaresBySideH + 1) {
                    this.board.push(new Segment(iteratorIndex, posKart, total));
                    total++;
                }



            }
        }
        return this;
    }

    checkBoardClicks() {
        if (!this.modalOpened)
            for (let segment of this.board) {
                if (!(segment instanceof Index)) {
                    if (segment.mousePointing()) segment.colorSegment();
                }
            }
    }

    refreshBoard() {
        clear();

        for (let segment of userInterface.board) {
            segment.display();
        }

        for (const fxn in this.executeQueue) {
            this.executeQueue[fxn]();
        }
    }

}

const userInterface = new UserInterface();

class Segment {
    constructor(iteratorIndex, posKart, num) {
        this.iteratorIndex = iteratorIndex;
        this.posKart = posKart;
        this.num = num;
        this.pos = createVector(
            this.iteratorIndex.x * settings.squareSize + settings.squareSpacer * this.iteratorIndex.x + 2,
            this.iteratorIndex.y * settings.squareSize + settings.squareSpacer * this.iteratorIndex.y + 2
        );
        this.stroke = settings.squareStroke;
        this.fill = settings.squareFill;
        this.round = settings.squareCurvature;
        this.textColor = settings.squareTextColor;
        this.textStroke = settings.squareTextStrokeColor;
        this.textStrokeWeight = settings.squareTextWeight;
        this.textSize = settings.squareTextSize;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(this.stroke);
        fill(this.fill);

        rect(0, 0, settings.squareSize, settings.squareSize, this.round)

        if (this.txt) {
            textSize(this.textSize);
            fill(this.textColor);
            stroke(this.textStroke);
            textAlign(CENTER, CENTER)
            strokeWeight(this.textStrokeWeight);
            text(this.txt, 2, 2, settings.squareSize, settings.squareSize);
        }

        pop();
    }

    mousePointing() {
        return mouseX.between(this.pos.x, this.pos.x + settings.squareSize) &&
            mouseY.between(this.pos.y, this.pos.y + settings.squareSize);
    }
}

class Index extends Segment {
    constructor(iteratorIndex) {
        super(iteratorIndex, null, null);
        this.stroke = settings.indexStroke;
        this.fill = settings.indexFill;
        this.round = settings.indexCurvature;

        this.textStrokeWeight = settings.indexTextWeight;
        this.textSize = settings.indexTextSize;

        this.textStroke = settings.indexTextStrokeColor;
        this.textStrokeWeight = settings.indexTextWeight;

        this.txt = this.iteratorIndex.x;
        if (this.iteratorIndex.x == 0 || this.iteratorIndex.x == 11) this.txt = this.iteratorIndex.y;
    }

    display() {
        super.display();
    }
}

$('#modal').on('show.bs.modal', function () {
    userInterface.modalOpened = true;
})

$('#modal').on('hidden.bs.modal', function () {
    userInterface.modalOpened = false;

    if (select(".saveColorDsc")) select(".saveColorDsc").remove();

    select(".p5Canvas").show();
    select(".colorSchemeContainer").show();
})