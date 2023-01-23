import { QueryType } from "../interfaces/interfaces";


export const queryString = (item:QueryType, value:string):string => {
    if (value.trim().length > 0) {
        const fullWord = value.trim().split(" ").join("+").toLowerCase()
        return `&${item}=${fullWord}`
    } else { return "" }
};

export const queryArray = (item:QueryType, value:string[]):string => {

    let arrayQuery = ""

    if (value.length > 0) {
        for (const val of value) {
            arrayQuery += `&${item}=${val}`
        }
        return arrayQuery
    } else { return arrayQuery }
};

