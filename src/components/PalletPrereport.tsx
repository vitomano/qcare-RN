import React from 'react'
import { Text, View } from 'react-native'
import { DataPrereport, PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'
import { danger, lightGrey } from '../theme/variables'
import { InputPallet } from './InputPallet'
import { TextH3 } from './ui/TextH3'

interface Props {
    pallet: DataPrereport | PalletState,
    i: number
}

export const PalletPrereport = ({ pallet, i }: Props) => {
    return (
        <View
            style={{ ...globalStyles.shadow, marginVertical: 2 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween, marginBottom: 20 }}>
                    <TextH3>{`Pallet ${i + 1}`}</TextH3>
                    <Text style={{ color: danger }}>remove</Text>
                </View>

                <View style={{ borderBottomWidth: .5, borderBottomColor: lightGrey, paddingBottom: 10, marginBottom: 20 }}>
                    {
                        pallet.labels.length > 0 &&
                        <>
                            <Text style={{ ...inputStyles.inputLabel, fontWeight: 'bold' }}>Labels</Text>
                            {
                                pallet.labels.map((lab, i) => (
                                    <InputPallet
                                        key={i}
                                        item={lab}
                                    />
                                ))
                            }
                        </>
                    }
                </View>

                <View>
                    {
                        pallet.appareance.length > 0 &&
                        <>
                            <Text style={{ ...inputStyles.inputLabel, fontWeight: 'bold' }}>Appearance</Text>
                            {

                                pallet.appareance.map((lab, i) => (
                                    <InputPallet
                                        key={i}
                                        item={lab}
                                    />
                                ))
                            }
                        </>
                    }
                </View>

                <View>
                    {
                        pallet.pallgrow.length > 0 &&
                        <>
                            <Text style={{ ...inputStyles.inputLabel, fontWeight: 'bold' }}>Pall/Grower</Text>
                            {
                                pallet.pallgrow.map((lab, i) => (
                                    <InputPallet
                                        key={i}
                                        item={lab}
                                    />
                                ))
                            }
                        </>
                    }
                </View>
            </View>
        </View>


    )
}
