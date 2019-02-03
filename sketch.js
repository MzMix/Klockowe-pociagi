class Segment {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(150);
        stroke(255);
        rect(0, 0, this.w, this.h)
        pop();
    }

    checkPointing() {

        if (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.w) {
            return true;
        } else {
            return false;
        }
    }
}

class Brick {
    constructor(w, h, color, type) {
        this.w = w;
        this.h = h;
        this.color = color;
        this.type = type;
    }

    draw(x, y) {
        push();
        translate(x, y);

        if (this.type == 'br') {
            fill(this.color);
            rect(0, 0, this.w, this.h)
        } else if (this.type == 't0') {
            fill(0);
            rect(0, 0, 3 * size, 1 * size);
            fill('white');
            ellipse(0 + size / 2, size / 2, size - 5);
            rect(0 + 2 * size, 0, size, size);
            this.w = 3 * size;
            this.h = size;
        } else if (this.type == 't1') {
            fill(0);
            rect(0, 0, 3 * size, 1 * size);
            fill('white');
            ellipse(2 * size + size / 2, size / 2, size - 5);
            rect(0, 0, size, size);
            this.w = 3 * size;
            this.h = size;
        } else if (this.type == 't2') {
            fill(0);
            rect(0, 0, 1 * size, 3 * size);
            fill('white');
            ellipse(size / 2, size / 2, size - 5);
            rect(0, 2 * size, size, size);
            this.w = size;
            this.h = 3 * size;
        } else if (this.type == 't3') {
            fill(0);
            rect(0, 0, 1 * size, 3 * size);
            fill('white');
            ellipse(size / 2, 2.5 * size, size - 5);
            rect(0, 0, size, size);
            this.w = size;
            this.h = 3 * size;
        }
        pop();
    }
    checkPointing() {

        if (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.w) {
            return true;
        } else {
            return false;
        }
    }
}

let segments = [];
let bricks = [];
const size = 40;
const colors = ['deepskyblue', 'purple', 'red', 'greenyellow', 'darkorange'];
let picked;
let counter = 0;

function createMyBtn(i, parent, bcgImg, single) {
    let btn;
    btn = createDiv(' ');

    if (parent == '.pion' && single == true) {
        btn.size(size, size);
    } else if (parent == '.pion' && single != true) {
        btn.size(size, size * 2);
    } else {
        btn.size(size * 2, size);
    }

    if (bcgImg) {
        btn.style('background-image', 'url("./icons/' + bcgImg + '")')

        if (parent == '.pion') {
            btn.size(size, size * 3);
        } else {
            btn.size(size * 3, size);
        }
    } else {
        btn.style('background-color', colors[i]);
    }

    btn.addClass('btn')
    btn.attribute('onclick', 'selectBrick(' + counter + ')');
    counter++;
    select(parent).child(btn);
}

function selectBrick(val) {
    picked = bricks[val];
}

function createMenuBox() {

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.pion', null, true);
    }

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.pion', null, false);
    }

    createMyBtn(null, '.pion', 'down.png', false);
    createMyBtn(null, '.pion', 'up.png', false);

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.poziom', null, false);
    }

    createMyBtn(null, '.poziom', 'right.png', false);
    createMyBtn(null, '.poziom', 'left.png', false);

    select('.reset').html('<button onclick="redraw()">RESET</button>')

}

function createBricks() {
    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(size, size, colors[i], 'br'));
    }

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(1 * size, 2 * size, colors[i], 'br'));
    }

    bricks.push(new Brick(null, null, null, 't3'));
    bricks.push(new Brick(null, null, null, 't2'));

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(2 * size, 1 * size, colors[i], 'br'));
    }

    bricks.push(new Brick(null, null, null, 't1'));
    bricks.push(new Brick(null, null, null, 't0'));
}

function setup() {
    let c = createCanvas(641, 321);
    select('.box').child(c);
    createBricks();
    createMenuBox();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 16; j++) {
            segments.push(new Segment(j * size, i * size, size, size));
        }
    }
    noLoop();
}

function draw() {
    // background('#2555');
    background('#553D67');

    for (let s of segments) {
        s.display();
    }
}

function mousePressed() {
    for (s of segments) {
        if (s.checkPointing()) {
            if (picked) {
                picked.draw(s.x, s.y);
            }
        }
    }
}