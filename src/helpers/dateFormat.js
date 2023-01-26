
export function dateFormat(date) {
    const newDate = new Date(date).toLocaleDateString('en-NL')
    // const newDate = new Date(date).toLocaleDateString('nl')
    return newDate
}

export function duration(startDate, endDate) {
    const timeTaken = new Date(endDate) - new Date(startDate)
    let seconds = ("0" + Math.floor(timeTaken / 1000 % 60)).slice(-2).toString()
    let minutes = ("0" + Math.floor(timeTaken / 60000 % 60)).slice(-2).toString()

    if(!startDate || !endDate) return undefined

    return minutes+":"+seconds
};