export function GetLetter(number) {
    return String.fromCharCode(65 + number);
}

export function GetTextColorOnBackground(color) {

    if (color === 'white' || color == undefined || color == null) color = '#ffffff';

    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (yiq >= 128) ? '#000' : '#fff';
}