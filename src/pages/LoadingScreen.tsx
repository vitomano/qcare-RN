import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextApp } from '../components/ui/TextApp'

interface Props {
  text?: string
}

export const LoadingScreen = ({ text }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator
        size={50}
        color="black"
      />
      {
        text &&
        <TextApp>{text}</TextApp>
      }
    </View>
  )
}