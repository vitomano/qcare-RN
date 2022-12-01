import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../theme/variables';
import { TextApp } from './ui/TextApp';

interface Props {
    title: string
    handlePress: () => void
    icon?: string
}

export const AddPalletButton = ({ handlePress, title, icon = undefined }: Props) => {
    return (
        <View
            style={{ alignItems: "center" }}
        >
            <TouchableOpacity
                activeOpacity={.8}
                onPress={handlePress}
                style={{ paddingVertical: 10, alignItems: "center" }}
                >
                <Icon name={icon ? icon : "add-circle"} style={{ marginBottom: 2, color: blue }} size={50} />
                <TextApp size='s'>{title}</TextApp>
            </TouchableOpacity>
        </View>
    )
}
