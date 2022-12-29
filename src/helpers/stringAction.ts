import { ActionNum } from '../interfaces/interfaces';

export const stringAction = (action:ActionNum="0"):string => {

    switch (action) {
        case "1": return "Dump"
        case "2": return "Rejected"
        case "3": return "Hold"
        case "4": return "Priority for Departure"
        case "5": return "Suitable for QC check / Repack"
        case "6": return "Suitable for departure"
        case "7": return "Suitable for Storage"
                
        default:
            return "none"
    }
}