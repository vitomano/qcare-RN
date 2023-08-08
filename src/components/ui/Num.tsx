import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { text } from '../../theme/variables'

interface Props {
  num: number
  style?: StyleProp<ViewStyle>
  size?: "s" | "m"
}

export const Num = ({ num, style, size = "s" }: Props) => {

  return (
    <View style={{ backgroundColor: text, borderRadius: 50, width: size === "s" ? 20 : 28, height: size === "s" ? 20 : 28, justifyContent: "center", alignItems: "center", ...style as any }}>
      <Text style={{ fontSize: size === "s" ? 12 : 18, fontWeight: 'bold', textAlign: "center", color: "#fff" }}>{num}</Text>
    </View>
  )
}


