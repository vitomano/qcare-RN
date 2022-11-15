import { View, Text, StyleSheet, TouchableOpacity, StyleSheetProperties, StyleProp } from 'react-native';
import React from 'react'
import { greenMain } from '../theme/variables';

interface Props {
    text: string,
    width?: 40 | 50 | 60 | 70 | 80 | 90 | 100,
    outline?: boolean,
    secondary?: boolean,
    centered?: boolean,
    onPress?: () => void,
}

export default function StyledButton({
    text = "Click",
    outline,
    secondary,
    width,
    onPress
}: Props) {

    const buttonStyle = [
        styles.buttonContainer,
        width === 40 && styles.buttonCont40,
        width === 50 && styles.buttonCont50,
        width === 60 && styles.buttonCont60,
        width === 70 && styles.buttonCont70,
        width === 80 && styles.buttonCont80,
        width === 90 && styles.buttonCont90,
    ]

    const button = [
        styles.button,
        !outline && styles.buttonFilled,
        (!outline && secondary) && styles.buttonFilledSecondary,
        outline && styles.buttonOutline,
        (outline && secondary) && styles.buttonOutlineSecondary
    ]

    const textStyle = [
        styles.buttonText,
        styles.textPrimary,
        (!outline || secondary) && styles.textWhite,
        (outline && secondary) && styles.textSecondary
    ]

    return (

        <View style={buttonStyle}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={button}
                onPress={onPress}
            >
                <Text style={textStyle} >{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: { width: "100%" },
    buttonCont40: { width: "40%" },
    buttonCont50: { width: "50%" },
    buttonCont60: { width: "60%" },
    buttonCont70: { width: "70%" },
    buttonCont80: { width: "80%" },
    buttonCont90: { width: "90%" },

    button: {
        width: "100%",
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonFilled: {
        backgroundColor: greenMain,
    },
    buttonFilledSecondary: {
        backgroundColor: "#a7c139",
    },

    buttonOutline: {
        borderWidth: 1,
        borderColor: greenMain,
    },
    buttonOutlineSecondary: {
        borderWidth: 1,
        borderColor: "#a7c139",
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 18,
    },
    textWhite: { color: "#fff" },
    textPrimary: { color: greenMain },
    textSecondary: { color: "#a7c139" }
})