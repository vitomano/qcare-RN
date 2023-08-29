import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { TextApp, TypeColor, TypeSizes } from './TextApp'
import { blue, text, doneBg, inactiveBg, redBg2 } from '../../theme/variables'


interface Props {
    typeSize?: TypeSizes,
    typeColor?: TypeColor,
    bgColor?: "done" | "red" | "inactive" | "blue" | "text" | "white" ,
    // bgColor?: BgColor,
    children: string | number
    style?: StyleProp<ViewStyle>,
}

export const Badge = ({ typeSize = "s", typeColor = "done", bgColor="done", style, children }: Props) => {

    const bgColors = [
        bgColor === "done" && styles.bgDone,
        bgColor === "red" && styles.bgRed,
        bgColor === "inactive" && styles.bgInactive,
        bgColor === "blue" && styles.bgBlue,
        bgColor === "text" && styles.bgText,
        bgColor === "white" && styles.bgWhite,
      ]

    return (
        // <View style={{ backgroundColor: bgColor, borderRadius: 50, paddingVertical: 2, paddingHorizontal: 7, marginLeft: 5 }}>
        <View style={[{...styles.badge}, ...bgColors, ...[style] as never]}>
            <TextApp size={typeSize} color={typeColor}>
                {children}
            </TextApp>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: 50,
        paddingVertical: 2,
        paddingHorizontal: 7,
        marginLeft: 5
    },

    bgDone: { backgroundColor: doneBg },
    bgRed: { backgroundColor: redBg2 },
    bgBlue: { backgroundColor: blue },
    bgInactive: { backgroundColor: inactiveBg },
    bgText: { backgroundColor: text },
    bgWhite: { backgroundColor: "#fff" },


});


