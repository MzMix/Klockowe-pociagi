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
    let tmp = new Number(id) / 10;

    let x = Math.round((tmp % 1) * 10);
    if (x === 0) x = 10;

    let y = Math.floor(tmp);
    if (x === 10) y--;

    x--;
    y++;

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
    return `(${position.x}, ${position.y})`
}