import { Platform, StyleSheet } from "react-native";
import { inputColor } from "./variables";


export const inputStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10
    },
    inputLabel: {
        fontSize: 16
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 10,
        borderRadius: 10,
        backgroundColor: inputColor
    },
    select: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 2,

    }
});