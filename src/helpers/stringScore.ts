import React from 'react'
import { ScoreNum } from '../interfaces/interfaces';

export const stringScore = (score:ScoreNum="0"):string => {

    switch (score) {
        case "1": return "1 of 8"
        case "2": return "2 of 8"
        case "3": return "3 of 8"
        case "4": return "4 of 8"
        case "5": return "5 of 8"
        case "6": return "6 of 8"
        case "7": return "7 of 8"
        case "8": return "8 of 8"
                
        default:
            return "--"
    }
};