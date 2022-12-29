import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native';

import { inputStyles } from '../theme/inputStyles';
import { TextApp } from './ui/TextApp';

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
            <TextApp style={{ width: "50%" }}>{label}</TextApp>

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