import { Platform, StyleSheet } from "react-native";
import { inputColor, greenMain } from './variables';


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
        backgroundColor: inputColor,
    },
    inputOutline: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 10,
        borderRadius: 10,
        borderColor: greenMain,
        borderWidth: 1,
        backgroundColor: "transparent",
    },
    selectShape: {
        padding: 10,
        borderRadius: 10,
        minHeight: 35
    },
    select: {
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 2,
    },
    selectGrey: {
        backgroundColor: inputColor,
    },
    inputFontSize: {
        fontSize: 18
    }
});