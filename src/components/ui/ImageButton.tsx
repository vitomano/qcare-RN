import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { blue } from '../../theme/variables'
import { TextApp } from './TextApp'

interface Props{
    openLibrary:()=>void
    max?:string | number
    disabled?:boolean
}


export const ImageButton = ({openLibrary, max, disabled=false}:Props) => {
  return (
    <View
    style={{ alignItems: "center", justifyContent: "center", alignSelf: "center" }}
>
    <View
        style={{ alignItems: "center", justifyContent: "center", backgroundColor: blue, width: 50, height: 50, borderRadius: 50 }}
    >
        <TouchableOpacity
            activeOpacity={.8}
            onPress={openLibrary}
            disabled={ disabled }
        >
            <Icon name="camera" color="#fff" size={30} />
        </TouchableOpacity>
    </View>
    <TextApp size='s' style={{ marginTop: 5, color: blue }}>Max. {max} images</TextApp>

</View>
  )
}
