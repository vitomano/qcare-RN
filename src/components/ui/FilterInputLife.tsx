import React from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import { darkGrey } from '../../theme/variables'
import { TextApp } from './TextApp'


interface Props {
    label: string,
    value: string,
    onChange: (txt:string) => void
}

export const FilterInputLife = ({ label, value, onChange }: Props) => {

    return (
        <View style={[globalStyles.flexRow, styles.container]}>
            <TextApp size='s' bold>{label}</TextApp>
            <TextInput
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                value={ value as string}
                onChangeText={onChange}
                style={styles.textInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === "android" ? 2 : 6,
        marginBottom: 20,
        borderBottomColor: darkGrey,
        borderBottomWidth: .5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        padding: 0
    }
});