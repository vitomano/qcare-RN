import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native';

interface Props{
    children: JSX.Element | JSX.Element[]
    style?: StyleProp<ViewStyle>
}

export const CentredContent = ({ children, style }:Props) => {
    return (
        <View style={{alignItems: "center", ...style as any }}>
            {children}
        </View>
    )
}
