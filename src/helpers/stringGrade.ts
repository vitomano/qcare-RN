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
            return "--"
    }
};


// export function colorGrade(grade="0"){

//     if (grade === "0") {
//         return (
//             <View className="score score-0">
//                 <Text>No QC Grade</Text>
//             </View>)
//     }

//     if (grade === "1") {
//         return (
//             <View className="score score-2">
//                 <Text>Industry</Text>
//             </View>)
//     }
//     if (grade === "2") {
//         return (
//             <View className="score score-3">
//                 <Text>Borderline CAT 2</Text>
//             </View>)
//     }
//     if (grade === "3") {
//         return (
//             <View className="score score-4">
//                 <Text>CAT 2</Text>
//             </View>)
//     }
//     if (grade === "4") {
//         return (
//             <View className="score score-5">
//                 <Text>Borderline CAT 1</Text>
//             </View>)
//     }
//     if (grade === "5") {
//         return (
//             <View className="score score-6">
//                 <Text>CAT 1</Text>
//             </View>)
//     }
//     if (grade === "6") {
//         return (
//             <View className="score score-7">
//                 <Text>Extra</Text>
//             </View>)
//     }
  
// }