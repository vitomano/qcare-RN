import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { blue, danger, done, greenMain, inactive, red, text, textGrey } from '../../theme/variables'

export type TypeSizes = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "normal"
export type TypeColor = "text" | "danger" | "white" | "green" | "mute" | "blue" | "done" | "inactive"

interface Props {
  style?: StyleProp<TextStyle>,
  children: JSX.Element | JSX.Element[] | string | number | Element
  bold?: boolean
  center?: boolean
  size?: TypeSizes
  color?: TypeColor
  nowrap?: boolean
  numberOfLines?: number
}

export const TextApp = ({ children, style, bold=false, size="normal", color="text", center=false, nowrap=false, numberOfLines=0 }: Props) => {

  const textColor = [
    color === "text" && styles.colorNormal,
    color === "white" && styles.colorWhite,
    color === "danger" && styles.colorDanger,
    color === "green" && styles.colorGreen,
    color === "mute" && styles.colorMute,
    color === "inactive" && styles.colorInactive,
    color === "blue" && styles.colorBlue,
    color === "done" && styles.colorDone,
  ]

  const textWeight = [ bold ? styles.bold : styles.normal ]

  const textCenter = [ center ? styles.center : null ]

  const textSize = [
    size === "xxs" && styles.textXXS,
    size === "xs" && styles.textXS,
    size === "s" && styles.textS,
    size === "normal" && styles.textNormal,
    size === "m" && styles.textM,
    size === "l" && styles.textL,
    size === "xl" && styles.textXL,
    size === "xxl" && styles.textXXL,
  ]

  return (
    <Text numberOfLines={nowrap ? 1 : ( numberOfLines ?? 0)} style={ [...textColor, ...textSize, ...textWeight, ...textCenter ,...[style] as never]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  normal: { fontWeight: '500' },
  bold: { fontWeight: 'bold' },

  center: { textAlign: 'center' },

  colorNormal: { color: text },
  colorDanger: { color: red },
  colorWhite: { color: "#fff" },
  colorGreen: { color: greenMain },
  // colorMute: { color: mute },
  colorMute: { color: textGrey },
  colorInactive: { color: inactive },
  colorBlue: { color: blue },
  colorDone: { color: done },

  textXXS: { fontSize: 10 },
  textXS: { fontSize: 12 },
  textS: { fontSize: 14 },
  textNormal: { fontSize: 16 },
  textM: { fontSize: 20 },
  textL: { fontSize: 24 },
  textXL: { fontSize: 28 },
  textXXL: { fontSize: 32 },

});