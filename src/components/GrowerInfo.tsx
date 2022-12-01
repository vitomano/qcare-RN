import React, { useContext, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PrereportPallet } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { darkGreen, greenMain, lightGreen, text } from '../theme/variables';
import { IntakeContext } from '../context/IntakeContext';
import { TextApp } from './ui/TextApp';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContainer } from './modals/ModalContainer';
import qcareApi from '../api/qcareApi';
import ButtonStyled from './ui/ButtonStyled';
import { inputStyles } from '../theme/inputStyles';

interface Props {
    pallet: PrereportPallet,
    repId: string
    fetchData: () => void

}

export const GrowerInfo = ({ pallet, repId, fetchData }: Props) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [valGrower, setValGrower] = useState(pallet.addGrower?.grower_variety || "")
    const [valBoxes, setValBoxes] = useState(pallet.addGrower?.boxes || "")

    const editGrower = async () => {
        if (pallet.addGrower?.grower_variety === valGrower && pallet.addGrower?.boxes === valBoxes) return setOpenEdit(false)

        try {
            setUploading(true)

            const { data } = await qcareApi.put('/prereport/edit-grower', {
                reportId: repId,
                palletId: pallet.pid,
                grower: valGrower,
                boxes: valBoxes,
            })
            console.log(data)
            fetchData()

        } catch (error) {
            console.log(error)
        } finally {
            setUploading(false)
            setOpenEdit(false)
        }
    };

    return (
        <View style={{ flex: 1, marginBottom: 10 }}>
            <View style={{ ...globalStyles.flexBetween, ...styles.header }}>
                <Text style={{ ...styles.headerTitle }}>Grower / Variety</Text>
                <Text style={{ ...styles.headerTitle }}>Boxes</Text>
            </View>
            <View style={{ ...globalStyles.flexBetween, position: "relative" }}>
                <TextApp
                    bold
                    style={{ textAlign: "center", width: "48%" }}>
                    {pallet.addGrower?.grower_variety || "--"}
                </TextApp>

                <TextApp
                    bold
                    style={{ textAlign: "center", width: "48%" }}>
                    {pallet.addGrower?.boxes || "--"}
                </TextApp>

                <TouchableOpacity
                style={{ position: "absolute", right: 0 }}
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
                            <View style={{marginBottom: 20}}>
                                <TextApp bold size='m' style={{ marginBottom: 8 }}>Grower / Variety</TextApp>
                                <TextInput
                                    keyboardType='default'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={valGrower as string}
                                    style={{ ...inputStyles.inputOutline, ...inputStyles.inputFontSize }}
                                    onChangeText={(e) => setValGrower(e)}
                                />
                            </View>


                            <View>
                                <TextApp bold size='m' style={{ marginBottom: 8 }}>Boxes</TextApp>
                                <TextInput
                                    keyboardType='number-pad'
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={valBoxes as string}
                                    style={{ ...inputStyles.inputOutline, ...inputStyles.inputFontSize }}
                                    onChangeText={(e) => setValBoxes(e)}
                                />
                            </View>


                            <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                                <ButtonStyled
                                    onPress={() => setOpenEdit(false)}
                                    text='Cancel'
                                    outline
                                    width={48}
                                />
                                <ButtonStyled
                                    onPress={editGrower}
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
    header: {
        backgroundColor: lightGreen,
        height: 30,
        borderColor: greenMain,
        borderWidth: .5,
        borderRadius: 10,
        marginBottom: 10
    },
    headerTitle: {
        width: "48%",
        color: darkGreen,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});