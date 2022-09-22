/**
* @description Calculate position of a cell in a Cartesian coordinate system with the center being point (0,0).
* @param {number} id
* @return {{x: number, y: number}}
*/
export function CalculatePosition(id) {
    let tmp = new Number(id) / 10;

    let x = Math.round((tmp % 1) * 10);
    if (x === 0) x = 10;

    let y = -Math.floor(tmp);
    if (x === 10) y++;

    x -= 6;
    y += 5;

    if (x >= 0) x++;
    if (y <= 0) y--;

    return {
        x: x,
        y: y,
    };
}

/**
* @description Calculate position of a cell on a 10x10 board.
* @param {number} id
* @return {{x: number, y: number}}
*/
export function CalculateBoardPosition(id) {
    let x = id % 16 ? id % 16 : 16;
    let y = Math.ceil(id / 16);

    return {
        x: x,
        y: y,
    };
}

/**
 * @description Creates id for cell based on its position 
 * @param {{x: number, y: number}} position
 * @return {string}
*/
export function GetId(position) {
    return `(${position.x}, ${position.y})`;
}

/**
 * @description Compares two positions in CCS
 * @param {{x: number, y: number}} pos1
 * @param {{x: number, y: number}} pos2
 * @return {string}
*/
export function ComparePosition(pos1, pos2) {
    let sameX = (pos1.x === pos2.x);
    let sameY = (pos1.y === pos2.y);

    if (sameX && sameY) return 'EQUAL';
    if (sameX && !sameY) return 'SAME_X';
    if (!sameX && sameY) return 'SAME_Y';
    if (!sameX && !sameY) return 'DIFFERENT';
}

/**
 * @description Returns positon of the cell in the Board Array shifted by 1
 * @param {{x: number, y: number}} position
 * @return {string}
*/
export function ReturnCellId(position) {
    let target = document.getElementById(GetId(position));
    return target.getAttribute('pos');
}