import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { globalStyles } from '../../theme/globalStyles';
import { text } from '../../theme/variables';

interface Props {
    style?: StyleProp<TextStyle>,
    children: string,
}

export const TextTitle = ({style, children}:Props) => {
  return (
    <Text style={{ color: text, ...globalStyles.title, ...style as any}}>{children}</Text>
  )
}
