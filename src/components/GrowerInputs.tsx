import React, { useContext } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DataPrereport, PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles';
import { darkGreen, greenMain, lightGreen } from '../theme/variables';
import { IntakeContext } from '../context/IntakeContext';

interface Props{
    pallet: DataPrereport | PalletState,
}

export const GrowerInputs = ({ pallet }:Props) => {

    const { handleGrower } = useContext(IntakeContext)

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
        <View style={{...globalStyles.flexBetween, ...styles.header }}>
            <Text style={{...styles.headerTitle}}>Grower / Variety</Text>
            <Text style={{...styles.headerTitle}}>Boxes</Text>
        </View>
        <View style={{...globalStyles.flexBetween}}>
            <TextInput 
            style={{...inputStyles.inputOutline, width: "48%"}}
            onChangeText={ (e) => handleGrower(pallet.id, "grower_variety", e) }
            />
            <TextInput 
            style={{...inputStyles.inputOutline, width: "48%"}}
            onChangeText={ (e) => handleGrower(pallet.id, "boxes", e) }
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: lightGreen,
        height: 30,
        borderColor: greenMain,
        borderWidth: .5,
        borderRadius: 10,
        marginBottom: 10
    },
    headerTitle:{
        width:"48%",
        color: darkGreen,
        fontWeight: 'bold',
        textAlign:'center',
    }
});