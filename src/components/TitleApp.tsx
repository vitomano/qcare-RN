import React from 'react'
import { StyleSheet, Text, View, StyleProp } from 'react-native';

interface Props {
    title: string,
    style?: StyleProp<any>
    // style?: StyleProp<any>
};


export const TitleApp = ({title, style={paddingBottom: 20}}:Props) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }
});