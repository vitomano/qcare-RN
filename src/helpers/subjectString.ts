import { Report, SingleReport } from "../interfaces/intakes.reports";

export const subjectString = (data:SingleReport | Report) => {
    let newSubject = "Quality report"

    if (data.mainData.pallet_ref && data.mainData.pallet_ref.trim().length>0) {
        newSubject += ` ${data.mainData.pallet_ref.trim()}`
    }
    if (data.mainData.format && data.mainData.format.trim().length>0) {
        // newSubject += ` ${data.mainData.format.split("*")[1] || ""}`
        newSubject += ` ${data.mainData.format_gr.trim() || ""}g`
    }
    if (data.date) {

        let d = new Date(data.date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        // newSubject += ` ${[day, month, year].join('-')}`
        newSubject += ` ${day}${month}${year}`
    }

    return newSubject
};