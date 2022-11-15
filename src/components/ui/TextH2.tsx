import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { globalStyles } from '../../theme/globalStyles';

interface Props {
    style?: StyleProp<TextStyle>,
    children: string,
}

export const TextH2 = ({style, children}:Props) => {
  return (
    <Text style={{ fontSize: 20, fontWeight: 'bold', ...style as any }}>{children}</Text>
  )
}

