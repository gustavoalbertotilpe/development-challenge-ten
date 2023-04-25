export const capitalizeWords = (str:string) => {
    return str.split(" ").map(capitalizeFirstLetter).join(" ");
}

export const  capitalizeFirstLetter = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const lowerString = (str:string) => {
    let newString = str.toLowerCase();
    return newString;
}

export const upperString = (str:string) => {
    return str.toUpperCase();
}
