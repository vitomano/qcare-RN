//format  -  weight 10  -  valor

import { valorPallgrow } from "./eliminarEs"

export function percentage( form, weig, fru ){

    const total = (Math.round(((((weig/10)*valorPallgrow(fru))/form)*100) * 10) / 10)

    if(total === Infinity){
        return "--"
    } else if (total){
        return `${total}%`
    } else {
        return "0%"
    }
}
