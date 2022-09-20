/**
 * @description Utility functions for downloading provided content to file with provided name and of provided type.
 * @param {*} content 
 * @param {string} fileName 
 * @param {string} contentType 
 */
export function DonloadContent(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export function DownloadCanvas(canvas, filename) {
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = `${filename}.png`;
    anchor.click();

    anchor.remove();
}

function AddLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

export function GetDateForFileName() {
    const date = new Date();
    const [year, month, day, hour, minutes, seconds] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

    const eMonth = AddLeadingZero(month);
    const eDay = AddLeadingZero(day);
    const eHour = AddLeadingZero(hour);
    const eMinutes = AddLeadingZero(minutes);
    const eSeconds = AddLeadingZero(seconds);

    return `${year}-${eMonth}-${eDay}-${eHour}-${eMinutes}-${eSeconds}`;
}