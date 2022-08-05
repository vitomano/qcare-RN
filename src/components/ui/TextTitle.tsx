import React from 'react'
import { StyleProp, Text, ViewStyle } from 'react-native'
import { globalStyles } from '../../theme/globalStyles';

interface Props {
    style?: StyleProp<ViewStyle>,
    children: string,
}

export const TextTitle = ({style, children}:Props) => {
  return (
    <Text style={{ ...globalStyles.title, ...style as any}}>{children}</Text>
  )
}
