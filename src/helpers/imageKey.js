
export function keyName(url) {
    const short = url.split(".")
    const selec = short[short.length - 2].split("-")

    return selec[selec.length - 1]
    // return selec[selec.length - 1].split("").reverse().join("");
}

export function reverseStr(strng) {

    if(typeof strng === "string"){
        return strng.split("").reverse().join("");
    } else {return}

}