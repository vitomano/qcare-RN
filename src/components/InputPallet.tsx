import React, { useContext, useState } from 'react'
import { Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Slider } from '@miblanchard/react-native-slider';

import { DataPrereport, DetailObject, PalletState } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputStyles } from '../theme/inputStyles'
import { greenMain, inputColor, lightGreen } from '../theme/variables';
import { IntakeContext } from '../context/IntakeContext';
import { DetailName } from '../interfaces/interfaces';
import { PickerModal } from './modals/PickerModal';
import { PALLETTYPE } from '../data/selects';
import { TextApp } from './ui/TextApp';
import ButtonStyled from './ui/ButtonStyled';
import { CentredContent } from './CenterContent';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalBlock } from './modals/ModalBlock';

interface Props {
    pallet: DataPrereport | PalletState,
    item: DetailObject,
    detailName: DetailName
}

export const InputPallet = ({ pallet, item, detailName }: Props) => {

    const { handleChecked, handleInputText, handleSwitch, handleInputArray, addRemoveSample } = useContext(IntakeContext)
    const [palletType, setPalletType] = useState(false)
    const [sampleInput, setSampleInput] = useState(false)

    const handlePalletType = (val: string) => handleInputText(pallet.id, detailName, item.name, val)

    const labelAlign = item.name === "weight_check" ? styles.flexTop : styles.flexCenter

    return (

        <View style={{ ...globalStyles.flexBetween, marginBottom: 10 }}>
            {
                pallet && item &&
                <View style={[globalStyles.flexRow, labelAlign, { width: "50%", maxWidth: "40%" }]}>
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
            }

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
                <View style={{ width: "50%", flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        value={item.valor as string}
                        autoCorrect={false}
                        style={{ ...inputStyles.inputOutline, flex: 1 }}
                        onChangeText={(e) => handleInputText(pallet.id, detailName, item.name, e)}
                    />
                    {
                        item.name === "weight_10" && <TextApp bold style={{marginLeft: 5}}>gr.</TextApp>
                    }
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


            {
                item.tipe === "arrays" && Array.isArray(item.valor) && detailName !== "pallgrow" &&
                <View style={{ width: "50%", ...globalStyles.flexBetween, flexWrap: "wrap" }}>
                    {
                        item.valor.map((val, index) => {

                            const marginB = item.name === "weight_check" ? 5 : 0

                            return (
                                <TextInput
                                    key={index}
                                    keyboardType='default'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={val}
                                    style={{ ...inputStyles.inputOutline, width: "48%", marginBottom: marginB }}
                                    onChangeText={(e) => handleInputArray(pallet.id, detailName, item.name, index, e)}
                                />

                            )
                        })
                    }
                </View>
            }

            {
                item.tipe === "arrays" && Array.isArray(item.valor) && detailName === "pallgrow" &&
                <>
                    <TouchableOpacity style={{ width: "50%" }} activeOpacity={.8} onPress={() => setSampleInput(true)}>
                        <View style={[styles.samples, item.check ? styles.sampleGreen : styles.sampleWhite]}>
                            <TextApp size='s' bold style={{ color: greenMain }}>{item.valor.length} samples</TextApp>
                        </View>
                    </TouchableOpacity>

                    <ModalBlock
                        modal={sampleInput}
                        openModal={setSampleInput}
                    >
                        <View style={{padding: 20}}>
                            <TextApp bold size='m' style={{ marginBottom: 10 }}>{item.label}</TextApp>
                            <TextApp size='s' style={{ marginBottom: 10 }}>Samples</TextApp>
                            <View style={styles.inputGrid}>
                                {
                                    item.valor.map((val, index) => (
                                        <View key={index} style={{ ...globalStyles.flexRow, width: "22%", marginRight: 35, marginBottom: 10 }}>
                                            <TextApp bold size='s' style={{ width: 25 }}>{index + 1}.</TextApp>
                                            <TextInput
                                                keyboardType='number-pad'
                                                autoCapitalize="none"
                                                value={val as string}
                                                autoCorrect={false}
                                                style={{ ...inputStyles.inputOutline, width: "100%" }}
                                                onChangeText={(e) => handleInputArray(pallet.id, detailName, item.name, index, e)}
                                            />
                                        </View>
                                    ))
                                }
                            </View>

                            <View style={{ ...globalStyles.flexRow, justifyContent: "center", marginVertical: 10 }}>
                                <TouchableOpacity activeOpacity={.8}
                                    onPress={() => addRemoveSample("remove", pallet.id)}
                                >
                                    <Icon name="remove-circle" style={{ marginRight: 5, color: greenMain }} size={40} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={.8}
                                    onPress={() => addRemoveSample("add", pallet.id)}
                                >
                                    <Icon name="add-circle" style={{ marginLeft: 5, color: greenMain }} size={40} />
                                </TouchableOpacity>
                            </View>


                            <CentredContent>
                                <ButtonStyled
                                    onPress={() => setSampleInput(false)}
                                    text='Ok'
                                    blue
                                    width={50}
                                />
                            </CentredContent>
                        </View>

                    </ModalBlock>
                </>
            }



        </View>

    )
}

const styles = StyleSheet.create({
    flexCenter: { alignSelf: "center" },
    flexTop: { alignSelf: "flex-start", marginTop: 12 },

    inputGrid: {
        flexDirection: 'row',
        flexWrap: "wrap"
    },

    samples: {
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 10,
        borderRadius: 10,
        borderColor: greenMain,
        borderWidth: 1,

        shadowColor: greenMain,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 2,
    },
    sampleGreen: { backgroundColor: lightGreen },
    sampleWhite: { backgroundColor: "white" },
});


