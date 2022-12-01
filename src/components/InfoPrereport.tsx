import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { itemValor } from '../helpers/eliminarEs';
import { DetailObject, PrereportPallet } from '../interfaces/intakes.reports'
import { DetailName } from '../interfaces/interfaces';
import { TextApp } from './ui/TextApp';

import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/globalStyles';
import { greenMain, inputColor, lightGrey, text } from '../theme/variables';
import { ModalContainer } from './modals/ModalContainer';
import { inputStyles } from '../theme/inputStyles';
import ButtonStyled from './ui/ButtonStyled';
import qcareApi from '../api/qcareApi';
import { PickerModal } from './modals/PickerModal';
import { Slider } from '@miblanchard/react-native-slider';

interface Props {
    repId: string
    pallet: PrereportPallet
    item: DetailObject
    detailName: DetailName
    // refresh: boolean
    // setRefresh: (b: boolean) => void
    fetchData: () => void
}

export const InfoPrereport = ({ pallet, item, detailName, repId, fetchData }: Props) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [val, setVal] = useState(item.valor)
    const [uploading, setUploading] = useState(false)

    const slider = (e:number[]) => setVal(e[0])

    const editItem = async () => {

        console.log(item.valor, val)
        console.log(item.valor == val)
        if (item.valor === val) return setOpenEdit(false)

        try {
            setUploading(true)
            await qcareApi.put('/prereport/edit-item', {
                reportId: repId,
                palletId: pallet.pid,
                detailName,
                itemName: item.name,
                itemValue: val
            })

            fetchData()

        } catch (error) {
            console.log(error)
        } finally {
            setUploading(false)
            setOpenEdit(false)
        }
    };


    return (
        <View style={{ ...globalStyles.flexRow, ...styles.item }}>
            <TextApp style={{ width: "50%", marginRight: 10 }}>{item.label}</TextApp>
            <View style={{ ...globalStyles.flexBetween, flex: 1 }}>
                <TextApp bold style={{ width: "50%" }}>{itemValor(item.valor)}</TextApp>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => setOpenEdit(true)}
                >
                    <Icon name='create-outline' size={20} color={text} />
                </TouchableOpacity>
            </View>

            <ModalContainer
                modal={openEdit}
                openModal={setOpenEdit}
            >
                {
                    uploading
                        ?
                        <ActivityIndicator
                            size={50}
                            color="black"
                        />
                        :
                        <View>
                            <TextApp bold size='m' style={{ marginBottom: 10 }}>{item.label}</TextApp>
                            {
                                item.tipe === "text" &&
                                <TextInput
                                    keyboardType='default'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={val as string}
                                    style={{ ...inputStyles.inputOutline }}
                                    onChangeText={(e) => setVal(e)}
                                />
                            }

                            {
                                item.tipe === "number" &&
                                <TextInput
                                    keyboardType='number-pad'
                                    autoCapitalize="none"
                                    value={val as string}
                                    autoCorrect={false}
                                    style={{ ...inputStyles.inputOutline }}
                                    onChangeText={(e) => setVal(e)}
                                />
                            }
                            {
                                item.tipe === "checkbox" &&
                                <View>
                                    <Switch
                                        style={{ alignSelf: 'flex-start' }}
                                        trackColor={{ false: inputColor, true: greenMain }}
                                        thumbColor="#fff"
                                        ios_backgroundColor={inputColor}
                                        onValueChange={(e) => setVal(e)}
                                        value={val as boolean}
                                    />
                                </View>
                            }
                            {/* {
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
                            } */}
                            {
                                item.tipe === "range" &&
                                <View style={{ ...globalStyles.flexBetween }}>
                                    <View style={{ width: "85%", paddingRight: 5 }}>
                                        <Slider
                                            thumbStyle={{ backgroundColor: greenMain }}
                                            minimumTrackTintColor={greenMain}
                                            maximumTrackTintColor={inputColor}
                                            step={1}
                                            minimumValue={1}
                                            maximumValue={item.maxVal}
                                            value={val as number}
                                            onValueChange={(e) => setVal(e.toString())}
                                            // onValueChange={(e) => slider(e as any)}
                                        />

                                    </View >
                                    <TextApp size='xs' bold style={{ width: "15%", color: greenMain, textAlign: 'center' }}>{val}</TextApp>
                                </View>
                            }

                            <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                                <ButtonStyled
                                    onPress={() => setOpenEdit(false)}
                                    text='Cancel'
                                    outline
                                    width={48}
                                />
                                <ButtonStyled
                                    onPress={editItem}
                                    text='Confirm'
                                    width={48}
                                />
                            </View>
                        </View>
                }

            </ModalContainer>

        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        paddingVertical: 6,
        borderBottomWidth: .5,
        borderBottomColor: lightGrey
    }
});