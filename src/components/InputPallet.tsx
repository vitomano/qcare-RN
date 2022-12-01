import React, { useContext, useState } from 'react'
import { Switch, Text, TextInput, View } from 'react-native'

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Slider } from '@miblanchard/react-native-slider';

import { DataPrereport, DetailObject, PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'
import { greenMain, inputColor } from '../theme/variables';
import { IntakeContext } from '../context/IntakeContext';
import { DetailName } from '../interfaces/interfaces';
import { PickerModal } from './modals/PickerModal';
import { PALLETTYPE } from '../data/selects';
import { TextApp } from './ui/TextApp';

interface Props {
    pallet: DataPrereport | PalletState,
    item: DetailObject,
    detailName: DetailName
}

export const InputPallet = ({ pallet, item, detailName }: Props) => {

    const { handleChecked, handleInputText, handleSwitch } = useContext(IntakeContext)
    const [palletType, setPalletType] = useState(false)

    const handlePalletType = (val: string) => handleInputText(pallet.id, detailName, item.name, val)

    return (

        <View style={{ ...globalStyles.flexBetween, marginBottom: 10 }}>
            <View style={{ ...globalStyles.flexRow }}>
                <BouncyCheckbox
                    isChecked={item.check}
                    size={20}
                    fillColor={greenMain}
                    unfillColor="#FFFFFF"
                    iconStyle={{ marginRight: -8 }}
                    onPress={() => handleChecked(pallet.id, detailName, item.name)}
                />
                <TextApp>{item.label}</TextApp>
            </View>

            {
                item.tipe === "text" &&
                <View style={{ width: "50%" }}>
                    <TextInput
                        keyboardType='default'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={item.valor as string}
                        style={{ ...inputStyles.inputOutline }}
                        onChangeText={(e) => handleInputText(pallet.id, detailName, item.name, e)}
                    />
                </View>
            }
            {
                item.tipe === "number" &&
                <View style={{ width: "50%" }}>
                    <TextInput
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={item.valor as string}
                        autoCorrect={false}
                        style={{ ...inputStyles.inputOutline }}
                        onChangeText={(e) => handleInputText(pallet.id, detailName, item.name, e)}
                    />
                </View>
            }
            {
                item.tipe === "select" && item.name === "pallet_type" &&
                    <View style={{ width: "50%" }}>
                        <PickerModal
                            modal={palletType}
                            openModal={setPalletType}
                            LIST={PALLETTYPE}
                            setState={handlePalletType}
                            state={item.valor as string}
                        />
                    </View>
            }
            {
                item.tipe === "checkbox" &&
                <View style={{ width: "50%" }}>
                    <Switch
                        style={{ alignSelf: 'flex-end' }}
                        trackColor={{ false: inputColor, true: greenMain }}
                        thumbColor="#fff"
                        ios_backgroundColor={inputColor}
                        onValueChange={() => handleSwitch(pallet.id, detailName, item.name)}
                        value={item.valor as boolean}
                    />
                </View>
            }
            {
                item.tipe === "range" &&
                <View style={{ ...globalStyles.flexBetween, maxWidth: "50%" }}>
                    <View style={{ width: "85%", paddingRight: 5 }}>
                        <Slider
                            thumbStyle={{ backgroundColor: greenMain }}
                            minimumTrackTintColor={greenMain}
                            maximumTrackTintColor={inputColor}
                            step={1}
                            minimumValue={item.minVal}
                            maximumValue={item.maxVal}
                            value={item.valor as number}
                            onValueChange={(e) => handleInputText(pallet.id, detailName, item.name, e.toString() as string)}
                        />

                    </View >
                    <Text style={{ width: "15%", fontWeight: 'bold', color: greenMain, textAlign: 'center' }}>{item.valor}</Text>
                </View>
            }
        </View>

    )
}
