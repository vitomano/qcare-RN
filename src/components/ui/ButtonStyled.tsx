import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { danger, greenMain, inputColor } from '../../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/globalStyles';

interface Props {
    text: string,
    width?: 40 | 48 | 50 | 60 | 70 | 80 | 90 | 100,
    outline?: boolean,
    secondary?: boolean,
    centered?: boolean,
    danger?: boolean,
    disabled?: boolean,
    onPress?: () => void,
    icon?: string
}

export default function ButtonStyled({
    text = "Click",
    outline,
    secondary,
    danger,
    disabled,
    width,
    onPress,
    icon = undefined
}: Props) {

    const buttonStyle = [
        styles.buttonContainer,
        width === 40 && styles.buttonCont40,
        width === 48 && styles.buttonCont48,
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
        (outline && secondary) && styles.buttonOutlineSecondary,
        (!outline && danger) && styles.buttonFilledDanger,
        (outline && danger) && styles.buttonOutlineDanger,
        (disabled) && styles.buttonDisabled,
    ]

    const textStyle = [
        styles.buttonText,
        styles.textPrimary,
        (!outline || secondary) && styles.textWhite,
        (outline && secondary) && styles.textSecondary,
        (outline && danger) && styles.textDanger,

    ]

    const iconStyle = [
        styles.marginIcon,
        styles.imagePrimary ,
        (!outline || secondary) && styles.imageWhite,
        (outline && secondary) && styles.imageSecondary,
    ]

    return (

        <View style={buttonStyle}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={button}
                onPress={onPress}
            >
                {
                    icon
                        ?
                        <View style={{ ...globalStyles.flexRow }}>
                            <Icon name={icon} style={ iconStyle } size={25} />
                            <Text style={textStyle} >{text}</Text>
                        </View>
                        : <Text style={textStyle} >{text}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: { width: "100%" },
    buttonCont40: { width: "40%" },
    buttonCont48: { width: "48%" },
    buttonCont50: { width: "50%" },
    buttonCont60: { width: "60%" },
    buttonCont70: { width: "70%" },
    buttonCont80: { width: "80%" },
    buttonCont90: { width: "90%" },

    button: {
        width: "100%",
        borderRadius: 100,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled:{
        backgroundColor: inputColor,
    },

    buttonFilled: {
        backgroundColor: greenMain,
    },
    buttonFilledSecondary: {
        backgroundColor: "#a7c139",
    },
    buttonFilledDanger: {
        backgroundColor: danger,
    },

    buttonOutline: {
        borderWidth: 1,
        borderColor: greenMain,
    },
    buttonOutlineSecondary: {
        borderWidth: 1,
        borderColor: "#a7c139",
    },
    buttonOutlineDanger: {
        borderWidth: 1,
        borderColor: danger,
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 18,
    },
    textWhite: { color: "#fff" },
    textPrimary: { color: greenMain },
    textSecondary: { color: "#a7c139" },
    textDanger: { color: danger },

    imageWhite: { color: "#fff" },
    imagePrimary: { color: greenMain },
    imageSecondary: { color: "#a7c139" },

    marginIcon: {marginRight: 5, alignSelf: 'center'}
    
})