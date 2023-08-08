import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { text } from '../../theme/variables'

interface Props {
    action: () => void
    icon: string
    iconSize?: number
    background?: string
    iconColor?: string
}

export const IconBtn = ({ action, icon, background, iconColor=text, iconSize=28 }: Props) => {

    return (
        <>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={action}
                style={{ position: "absolute", top: -5, right: -5, zIndex: 10, flex: 1 }}
            >
                <Icon name={icon} size={iconSize} color={iconColor} />
            </TouchableOpacity>

            {
                background &&
            <View style={{ backgroundColor: background, position: "absolute", top: 1, right: 1, zIndex: 5, width: 15, height: 15, borderRadius: 10 }} />
            }
        </>

    )
}
