import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { danger, greenMain, text } from '../../theme/variables'

interface Props {
  style?: StyleProp<TextStyle>,
  children: JSX.Element | JSX.Element[] | string | number | Element
  bold?: boolean
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl" | "normal"
  color?: "text" | "danger" | "white" | "green"
}

export const TextApp = ({ children, style, bold=false, size="normal", color="text" }: Props) => {

  const textColor = [
    color === "text" && styles.colorNormal,
    color === "white" && styles.colorWhite,
    color === "danger" && styles.colorDanger,
    color === "green" && styles.colorGreen,
    
  ]

  const textWeight = [ bold ? styles.bold : styles.normal ]

  const textSize = [
    size === "xs" && styles.textXS,
    size === "s" && styles.textS,
    size === "normal" && styles.textNormal,
    size === "m" && styles.textM,
    size === "l" && styles.textL,
    size === "xl" && styles.textXL,
    size === "xxl" && styles.textXXL,
  ]

  return (
    <Text style={ [...textColor, ...textSize, ...textWeight, ...[style] as never]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  normal: { fontWeight: '500' },
  bold: { fontWeight: 'bold' },

  colorNormal: { color: text },
  colorDanger: { color: danger },
  colorWhite: { color: "#fff" },
  colorGreen: { color: greenMain },

  textXS: { fontSize: 12 },
  textS: { fontSize: 14 },
  textNormal: { fontSize: 16 },
  textM: { fontSize: 20 },
  textL: { fontSize: 24 },
  textXL: { fontSize: 28 },
  textXXL: { fontSize: 32 },

});