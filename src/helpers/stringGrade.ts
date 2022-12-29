import React from 'react'
import { GradeNum } from '../interfaces/interfaces';

export const stringGrade = (grade:GradeNum="0"):string => {
    switch (grade) {
        case "1": return "Industry"
        case "2": return "Borderline CAT 2"
        case "3": return "CAT 2"
        case "4": return "Borderline CAT 1"
        case "5": return "CAT 1"
        case "6": return "Extra"
                
        default:
            return "none"
    }
}