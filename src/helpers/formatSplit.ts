export function formatSplit(format = "0*0") {

    const num = (format.split("*")[1])?.split("g")[0] || 1
    const total = Number(num) || 1

    if (total) {
        return total
    } else {
        return 1
    }
}

export function totalKilos(format = "0*0", totalBoxes = "0") {

    if (format.includes("*") && !isNaN(Number(totalBoxes))) {

        let num1 = Number(format.split('*')[0]) || 0
        let num2 = Number((format.split('*')[1]).split('g')[0]) || 0

        return ((num1 * num2 * Number(totalBoxes)) / 1000)
    } else { return 0 }
};

export function totalSamples(format = "0*0") {

    if ( format.includes("*") ) {
        let samples = Number(format.split('*')[0]) || 0

        if (samples > 1 && !isNaN(samples)) { return Number(samples) }
        else { return 1 }

    } else { return 1 }
};