import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Asset } from 'react-native-image-picker'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { blue } from '../../theme/variables'
import { TextApp } from './TextApp'

interface Props{
    openLibrary:()=>void
    imagesLength:Asset[]
    max?:string | number
}


export const ImageButton = ({openLibrary, imagesLength, max}:Props) => {
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
        >
            <Icon name="camera" color="#fff" size={30} />
        </TouchableOpacity>
    </View>
    {
        imagesLength.length > 0
            ?
            <TextApp size='s' style={{ marginTop: 5 }}>{imagesLength.length} file/s selected</TextApp>
            : max ? <TextApp size='s' style={{ marginTop: 5, color: blue }}>Max. {max} images</TextApp> : null
        
    }
</View>
  )
}
