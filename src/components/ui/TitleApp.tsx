import React from 'react'
import { StyleSheet, Text, View, StyleProp, TextStyle } from 'react-native';

interface Props {
    title: string,
    style?: StyleProp<TextStyle>,
};


export const TitleApp = ({ title, style }: Props) => {

    return (
        <Text style={{ ...styles.title, ...style as any }}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        paddingBottom: 20,
        textAlign: 'center',
    }
});