import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DetailObject } from '../interfaces/intakes.reports';


interface Props {
    labels: DetailObject[];
    appareance: DetailObject[];
    pallgrow: DetailObject[];
    i: any;
}

export const Accordeon = ({ labels, appareance, pallgrow, i }: Props) => {
    return (
        <View style={styles.card}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Pallet {i + 1}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginHorizontal: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 5,
    }
});