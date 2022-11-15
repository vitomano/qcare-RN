import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';

import { inputColor } from '../theme/variables';
import { inputStyles } from '../theme/inputStyles';

interface Props {
    value: string
    label: string
    item: string
    editable?: boolean
    handleInput: any
}

export const CustomInput = ({ label, value, item, editable = true, handleInput }: Props) => {

    return (

        <View style={{ ...inputStyles.inputContainer }}>
            <Text style={{ ...inputStyles.inputLabel, width: "50%" }}>{label}</Text>

            <TextInput
                style={{ ...inputStyles.input, width: "50%" }}
                placeholderTextColor="rgba(255,255,255,0.4)"
                autoCapitalize="none"
                autoCorrect={false}
                editable={editable}
                value={value}
                onChangeText={text => handleInput(text, item)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    
})