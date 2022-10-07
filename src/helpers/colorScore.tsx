// import { View, StyleSheet, Text } from "@react-pdf/renderer";
import React from 'react'
import { StyleSheet, View } from "react-native"
import { score0, score1, score2, score3, score4, score5, score6, score7, score8 } from '../theme/variables';

// Establece color por score

export function colorScore(score="0"){

    if (score === "0") {
        return <View style={{...styles.scoreCircle, backgroundColor: score0}}></View>
    } 
    if (score === "1") {
        return <View style={{...styles.scoreCircle, backgroundColor: score1}}></View>
    } 
    if (score === "2") {
        return <View style={{...styles.scoreCircle, backgroundColor: score2}}></View>
    } 
    if (score === "3") {
        return <View style={{...styles.scoreCircle, backgroundColor: score3}}></View>
    } 
    if (score === "4") {
        return <View style={{...styles.scoreCircle, backgroundColor: score4}}></View>
    } 
    if (score === "5") {
        return <View style={{...styles.scoreCircle, backgroundColor: score5}}></View>
    } 
    if (score === "6") {
        return <View style={{...styles.scoreCircle, backgroundColor: score6}}></View>
    } 
    if (score === "7") {
        return <View style={{...styles.scoreCircle, backgroundColor: score7}}></View>
    } 
    if (score === "8") {
        return <View style={{...styles.scoreCircle, backgroundColor: score8}}></View>
    } else {
        return <View style={{...styles.scoreCircle, backgroundColor: score0}}></View>
    }
   

}

// export function colorScoreString(score){

//     if (score === "0") {
//         return "No Score"
//     }
//     if (score === "1") {
//         return "Bad"
//     }
//     if (score === "2") {
//         return "Poor"
//     }
//     if (score === "3") {
//         return "Fair"
//     }
//     if (score === "4") {
//         return "Good"
//     }
//     if (score === "5") {
//         return "Very Good"
//     } else {
//         return score
//     }

// }

// export function colorScorePdf(score="0"){

//     if (score === "0") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#C2C2C2", color: "black"}]}>
//                 <Text style={styles.scroreText}>No Score</Text>
//             </View>
//             )
//     }
//     if (score === "1") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#ed1c24", color: "white"}]}>
//                 <Text style={styles.scroreText}>Bad</Text>
//             </View>
//             )
//     }
//     if (score === "2") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#f7931e", color: "black"}]}>
//                 <Text style={styles.scroreText}>Poor</Text>
//             </View>
//             )
//     }
//     if (score === "3") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#fcee21", color: "black"}]}>
//                 <Text style={styles.scroreText}>Fair</Text>
//             </View>
//             )
//     }
//     if (score === "4") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#b4dd22", color: "black"}]}>
//                 <Text style={styles.scroreText}>Very Good</Text>
//             </View>
//             )
//     }
//     if (score === "5") {
//         return (
//             <View style={[styles.score, {backgroundColor: "#39b54a", color: "white"}]}>
//                 <Text style={styles.scroreText}>Very Good</Text>
//             </View>
//             )
//     }

// }

const styles = StyleSheet.create({

    scoreCircle:{
        width: 10,
        height: 10,
        borderRadius: 5,
    },


    // score: {
    //     minWidth: "80px",
    //     minHeight: "22px",
    //     paddingVertical: 1,
    //     paddingHorizontal: 6,
    //     borderRadius: 50,
    //     textAlign: "center",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // scroreText:{
    //     textAlign: "center",
    //     fontWeight: "bold",
    //     fontSize: "12px",
    //     alignSelf: "center"
    // }

});