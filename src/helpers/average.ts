import { DataPrereport, PalletState } from "../interfaces/intakes.reports"
import { Status } from "../interfaces/interfaces"

// export const average = (numArr:number[]):string => {

//     const scoreFiltered = numArr.filter(oneScore => oneScore > 0) || [0]

//     if (scoreFiltered.length === 0) return "0"
//     else { return (Math.min(...scoreFiltered)).toString() || "0" }
// }

export const average = (item:Status, pallets:DataPrereport[] | PalletState[]):string => {
    let average = null
    if (item === "score") { average = (pallets as DataPrereport[] | PalletState[]).map(sc => Number(sc.score || 0)) }
    if (item === "grade") { average = (pallets as DataPrereport[]).map(sc => Number(sc.grade || 0)) }
    if (item === "action") { average = (pallets as DataPrereport[]).map(sc => Number(sc.action || 0)) }

    const averageFiltered = average?.filter(oneScore => oneScore > 0) || [0]

    if (averageFiltered.length === 0) return "0"
    else { return (Math.min(...averageFiltered)).toString() || "0" }
}