import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { TitleApp } from '../components/TitleApp'
import { capitalize } from '../helpers/eliminarEs'
import { ProductStackParams } from '../navigation/CreateStack'
import { globalStyles } from '../theme/globalStyles';


interface Props extends StackScreenProps<ProductStackParams, "NewReportScreen"> { };

export const NewReportScreen = ({route}:Props) => {

  const [palletRef, setPalletRef] = useState("")

  return (
    <View style={{ ...globalStyles.containerFlex ,paddingHorizontal: 20}}>
      <TitleApp title={capitalize(route.params.fruit)}/>
      <View style={{...globalStyles.inputContainer}}>
        <Text style={{...globalStyles.inputText}}>Pallet Ref</Text>
        <TextInput
              // placeholder='Ingrese su nombre'
              style={{ ...globalStyles.input, width: '50%'}}
              autoCorrect={false}
              value={palletRef}
              onChangeText={value => setPalletRef(value)}
              placeholderTextColor="#ccc"
            />
      </View>
      <View style={{...globalStyles.inputContainer}}>
        <Text style={{...globalStyles.inputText}}>Pallet Ref</Text>
        <TextInput
              // placeholder='Ingrese su nombre'
              style={{ ...globalStyles.input, width: '50%'}}
              autoCorrect={false}
              value={palletRef}
              onChangeText={value => setPalletRef(value)}
              placeholderTextColor="#ccc"
            />
      </View>
    </View>
  )
}
