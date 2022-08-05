import { StyleSheet } from "react-native";
import { bgColor } from "./variables";

export const globalStyles = StyleSheet.create({
    globalMargin: {
        padding: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: bgColor,
        alignItems: 'center',
        padding: 10,
    },
    containerFlex: {
        flex: 1,
        backgroundColor: bgColor,
        alignItems: 'center',
    },
});