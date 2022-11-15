import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { globalStyles } from '../../theme/globalStyles';

interface Props {
    style?: StyleProp<TextStyle>,
    children: string,
}

export const TextH3 = ({style, children}:Props) => {
  return (
    <Text style={{ fontSize: 18, fontWeight: 'bold', ...style as any }}>{children}</Text>
  )
}

