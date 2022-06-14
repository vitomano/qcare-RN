
export const average = (numArr:number[]) => {

    const scoreFiltered = numArr.filter(oneScore => oneScore > 0) || [0]

    if (scoreFiltered.length === 0) return 0
    else { return Math.min(...scoreFiltered) || 0 }
}