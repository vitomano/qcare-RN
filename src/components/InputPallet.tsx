import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { DetailObject } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'

interface Props {
    item: DetailObject
}

export const InputPallet = ({ item }: Props) => {
    return (
        <View style={{...globalStyles.flexBetween, marginBottom: 10}}>
            <View style={{...globalStyles.flexRow}}>
                <Text>hola</Text>
                <Text>{item.label}</Text>
            </View>

            <TextInput
            style={{ ...inputStyles.input, width:"50%" }}
            />
        </View>
    )
}
