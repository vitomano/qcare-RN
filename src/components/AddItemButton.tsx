import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/globalStyles';
import { greenMain } from '../theme/variables';
import { TextApp } from './ui/TextApp';

interface Props {
    title: string
    handlePress: () => void
    icon?: string
}

export const AddItemButton = ({ handlePress, title, icon = undefined }: Props) => {
    return (
        <View style={{ marginTop: 5, marginLeft: -1, alignItems: "flex-start" }} >
            <TouchableOpacity
                style={{ ...globalStyles.flexRow }}
                onPress={handlePress}
                activeOpacity={.8}
            >
                <Icon name={icon ? icon : "add-circle-outline"} style={{ marginRight: 5, color: greenMain }} size={25} />
                <TextApp size='s'>{title}</TextApp>
            </TouchableOpacity>
        </View>
    )
}
