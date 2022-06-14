import { View, StyleSheet, Text } from "@react-pdf/renderer";

// Establece color por score

export function colorScore(score="0"){

    if (score === "0") {
        return (
            <div className="score score-0">
                <p>No Score</p>
            </div>)
    }
    if (score === "1") {
        return (
            <div className="score score-1">
                <p>Bad</p>
            </div>)
    }
    if (score === "2") {
        return (
            <div className="score score-2">
                <p>Poor</p>
            </div>)
    }
    if (score === "3") {
        return (
            <div className="score score-3">
                <p>Fair</p>
            </div>)
    }
    if (score === "4") {
        return (
            <div className="score score-4">
                <p>Good</p>
            </div>)
    }
    if (score === "5") {
        return (
            <div className="score score-5">
                <p>Very Good</p>
            </div>)
    }

}

export function colorScoreString(score){

    if (score === "0") {
        return "No Score"
    }
    if (score === "1") {
        return "Bad"
    }
    if (score === "2") {
        return "Poor"
    }
    if (score === "3") {
        return "Fair"
    }
    if (score === "4") {
        return "Good"
    }
    if (score === "5") {
        return "Very Good"
    } else {
        return score
    }

}

export function colorScorePdf(score="0"){

    if (score === "0") {
        return (
            <View style={[styles.score, {backgroundColor: "#C2C2C2", color: "black"}]}>
                <Text style={styles.scroreText}>No Score</Text>
            </View>
            )
    }
    if (score === "1") {
        return (
            <View style={[styles.score, {backgroundColor: "#ed1c24", color: "white"}]}>
                <Text style={styles.scroreText}>Bad</Text>
            </View>
            )
    }
    if (score === "2") {
        return (
            <View style={[styles.score, {backgroundColor: "#f7931e", color: "black"}]}>
                <Text style={styles.scroreText}>Poor</Text>
            </View>
            )
    }
    if (score === "3") {
        return (
            <View style={[styles.score, {backgroundColor: "#fcee21", color: "black"}]}>
                <Text style={styles.scroreText}>Fair</Text>
            </View>
            )
    }
    if (score === "4") {
        return (
            <View style={[styles.score, {backgroundColor: "#b4dd22", color: "black"}]}>
                <Text style={styles.scroreText}>Very Good</Text>
            </View>
            )
    }
    if (score === "5") {
        return (
            <View style={[styles.score, {backgroundColor: "#39b54a", color: "white"}]}>
                <Text style={styles.scroreText}>Very Good</Text>
            </View>
            )
    }

}

const styles = StyleSheet.create({
    score: {
        minWidth: "80px",
        minHeight: "22px",
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 50,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    scroreText:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "12px",
        alignSelf: "center"
    }

});