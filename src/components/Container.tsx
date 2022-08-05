import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { globalStyles } from '../theme/globalStyles'
import { bgColor } from '../theme/variables'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const Container = ({ children }: Props) => {

    // const { top } = useSafeAreaInsets()

    return (
        <View style={{
            flex: 1,
            backgroundColor: bgColor,
            width: '100%',
            alignItems: 'center',
            paddingVertical: 20,
        }}>
            {/* <View style={{ width: '95%'}}> */}
            {/* <View style={{ ...globalStyles.globalMargin }}> */}
            {/* <View style={{ top: top + 5, ...globalStyles.globalMargin }}> */}
                {children}
            {/* </View> */}
        </View>
    )
}
