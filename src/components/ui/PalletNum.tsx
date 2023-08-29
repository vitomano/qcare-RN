import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import { text } from '../../theme/variables'
import { TextH3 } from './TextH3'

interface Props {
  num: number,
  title?: string
}

export const PalletNum = ({ num, title="Pallet" }: Props) => {
  return (
    <View style={{ ...globalStyles.flexRow }}>
      <TextH3 style={{ marginRight: 5 }}>{title}</TextH3>
      <View style={{ backgroundColor: text, borderRadius: 50, width: 18, height: 18, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: "center", color: "#fff" }}>{num}</Text>
      </View>
    </View>
  )
}
