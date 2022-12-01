import React from 'react'
import { View } from 'react-native'

export const CentredContent = ({ children }:any) => {
    return (
        <View style={{ flex: 1, alignItems: "center", marginTop: 20, marginBottom: 10 }}>
            {children}
        </View>
    )
}
