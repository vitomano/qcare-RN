export function formatSplit(valor = "0*0"):number {

    if( valor.includes("k") ){
        let res = valor.split(/[k*]+/)
        return +res[res.length-2] * 1000

      } else {
        let res = valor.split(/[g*]+/)
        return +res[res.length-2]
      }
}

export function totalKilos(format = "0*0", totalBoxes = "0") {

    if(!format || !totalBoxes) return 1

    if (format.includes("*")) {
      let num1:number = Number(format.split('*')[0]) || 1
      let num2:number

      if( format.includes("k") ) num2 = parseInt((format.split('*')[1]).split("k")[0]) * 1000 || 1
      else num2 = parseInt((format.split('*')[1]).split('g')[0]) || 1

      return ((num1 * num2 * Number(totalBoxes)) / 1000)
    } else {
      let num2 = parseInt(format.split("k")[0])*1000 || 1
      return ((1 * num2 * Number(totalBoxes)) / 1000)
    }
};

export function totalSamples(format = "0*0") {

    if ( format.includes("*") ) {
        let samples = Number(format.split('*')[0]) || 0

        if (samples > 1 && !isNaN(samples)) { return Number(samples) }
        else { return 1 }

    } else { return 1 }
};