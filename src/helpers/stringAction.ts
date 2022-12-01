import React from 'react'
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
            return "--"
    }

};


// export function colorAction(action="0"){

//     if (action === "0") {
//         return (
//             <View className="score score-0">
//                 <Text>No QC Action</Text>
//             </View>)
//     }

//     if (action === "1") {
//         return (
//             <View className="score score-2">
//                 <Text>Dump</Text>
//             </View>)
//     }
//     if (action === "2") {
//         return (
//             <View className="score score-2">
//                 <Text>Rejected</Text>
//             </View>)
//     }
//     if (action === "3") {
//         return (
//             <View className="score score-4">
//                 <Text>Hold</Text>
//             </View>)
//     }
//     if (action === "4") {
//         return (
//             <View className="score score-5">
//                 <Text className='font-xsmall'>Priority for Departure</Text>
//             </View>)
//     }
//     if (action === "5") {
//         return (
//             <View className="score score-5">
//                 <Text className='font-xsmall'>Suitable for QC check / Repack</Text>
//             </View>)
//     }
//     if (action === "6") {
//         return (
//             <View className="score score-6">
//                 <Text className='font-xsmall'>Suitable for departure</Text>
//             </View>)
//     }
//     if (action === "7") {
//         return (
//             <View className="score score-7">
//                 <Text className='font-small'>Suitable for storage</Text>
//             </View>)
//     }
  
// }