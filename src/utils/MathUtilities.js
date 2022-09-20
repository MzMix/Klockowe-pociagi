//@info: This is a helper function to generate a random number beetween min and max
//@param: min:number, max:number
//@return: number
export function RandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}