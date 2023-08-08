import React from 'react'
import { View } from 'react-native'
import { bgColor } from '../theme/variables'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const Container = ({ children }: Props) => {

    return (
        <View style={{
            flex: 1,
            backgroundColor: bgColor,
            width: '100%',
            alignItems: 'center',
            paddingVertical: 20,
        }}>
                {children}
        </View>
    )
}
