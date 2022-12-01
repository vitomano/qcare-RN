import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { text } from '../../theme/variables';

interface Props {
    style?: StyleProp<TextStyle>,
    children: string,
}

export const TextH3 = ({style, children}:Props) => {
  return (
    <Text style={{ color: text ,fontSize: 18, fontWeight: 'bold', ...style as any }}>{children}</Text>
  )
}

