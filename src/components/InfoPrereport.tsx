import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { itemValor, valorPallgrow } from '../helpers/eliminarEs';
import { DetailObject, Pallet, PrereportPallet } from '../interfaces/intakes.reports'
import { DetailName } from '../interfaces/interfaces';
import { TextApp } from './ui/TextApp';

import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/globalStyles';
import { greenMain, inputColor, lightGrey, text } from '../theme/variables';
import { ModalContainer } from './modals/ModalContainer';
import { inputStyles } from '../theme/inputStyles';
import ButtonStyled from './ui/ButtonStyled';
import { Slider } from '@miblanchard/react-native-slider';
import { useEditPrereport } from '../api/usePrereport';
import { alertMsg } from '../helpers/alertMsg';
import { PickerModal } from './modals/PickerModal';
import { PALLETTYPE } from '../data/selects';
import { percentage } from '../helpers/percentage';
import { useEditReport, useReport } from '../api/useReport';

interface Props {
    repId: string
    pallet: PrereportPallet | Pallet
    item: DetailObject
    detailName: DetailName
    prereport?: boolean
}

export const InfoPrereport = ({ pallet, item, detailName, repId, prereport=false }: Props) => {

    const { data } = useReport(repId)
    const { mutate } = useEditPrereport()
    const { mutate:mutateEditReport } = useEditReport()

    const weight_format = Number((pallet.details?.pallgrow?.find(app => app.name === "weight_10"))?.valor) || 0
    const format = data?.mainData?.format_gr || data?.formatGr || 0


    const [openEdit, setOpenEdit] = useState(false)
    const [openSelect, setOpenSelect] = useState(false)
    const [val, setVal] = useState(item.valor)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        setVal(item.valor)
    }, [item])

    const editItem = async () => {

        if (item.valor === val) return setOpenEdit(false)

        const editItem = {
            reportId: repId,
            palletId: pallet.pid,
            detailName,
            itemName: item.name,
            itemValue: val
        }
        try {
            setUploading(true)

            prereport
            ?
            mutate(editItem)
            :
            mutateEditReport(editItem)
        } catch (error) {
            console.log(error)
            alertMsg('Error', "Something went wrong")
        } finally {
            setUploading(false)
            setOpenEdit(false)
        }
    };


    return (
        <View style={{ ...globalStyles.flexRow, ...styles.item }}>
            <TextApp style={{ width: "50%", marginRight: 10 }}>{item.label}</TextApp>
            <View style={{ ...globalStyles.flexBetween, flex: 1 }}>
                {
                    detailName === "pallgrow"
                        ?
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <TextApp bold style={{ width: "50%" }}>{valorPallgrow(item.valor)}{item.name === 'weight_10' && "g"}</TextApp>
                            {
                                (item.name !== "weight_10") &&
                                <TextApp>{percentage(format, weight_format, item.valor)}</TextApp>
                            }
                        </View>

                        : <TextApp bold style={{ flex: 1 }}>{itemValor(item.valor)}</TextApp>

                }
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => setOpenEdit(true)}
                    style={{ marginLeft: 5 }}
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
                                        />

                                    </View >
                                    <TextApp size='xs' bold style={{ width: "15%", color: greenMain, textAlign: 'center' }}>{val}</TextApp>
                                </View>
                            }

                            {
                                item.tipe === "select" && item.name === "pallet_type" &&

                                <View style={{ width: "100%" }}>
                                    <PickerModal
                                        modal={openSelect}
                                        openModal={setOpenSelect}
                                        LIST={PALLETTYPE}
                                        setState={(val) => setVal(val)}
                                        state={item.valor as string}
                                    />
                                </View>

                            }
                            <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                                <ButtonStyled
                                    onPress={() => {
                                        setOpenEdit(false)
                                        setVal(item.valor)
                                    }}
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