import React from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { NewGrower } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { darkGreen, greenMain, lightGreen } from '../theme/variables';
import { TextApp } from './ui/TextApp';

interface Props {
    grower: NewGrower,
    style?: StyleProp<ViewStyle>
}

export const GrowerShow = ({ grower, style }: Props) => {

    return (
        <View style={{ flex: 1, ...style as any }}>
            <View style={{ ...globalStyles.flexBetween, ...styles.header }}>
                <Text style={{ ...styles.headerTitle }}>Grower / Variety</Text>
                <Text style={{ ...styles.headerTitle }}>Boxes</Text>
            </View>
            <View style={{ ...globalStyles.flexBetween }}>
                <TextApp
                    bold
                    style={{ textAlign: "center", width: "48%" }}>
                    {grower.grower_variety || "--"}
                </TextApp>

                <TextApp
                    bold
                    style={{ textAlign: "center", width: "48%" }}>
                    {grower.boxes || "--"}
                </TextApp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: lightGreen,
        height: 30,
        borderColor: greenMain,
        borderWidth: .5,
        borderRadius: 10,
        marginBottom: 10
    },
    headerTitle: {
        width: "48%",
        color: darkGreen,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});