import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { TextApp } from './ui/TextApp'
import { inputColor } from '../theme/variables';
import { MainData, ObjectType } from '../interfaces/intakes.reports';
import { jsonToPickerSelect } from '../helpers/jsonToString';
import { ActionButtons } from './ui/ActionButtons';
import { ListType, PickerModal } from './modals/PickerModal';
import { useAddDiscrepancy } from '../api/useDiscrepancy';

interface Props {
    mainData: MainData
    closeModal: () => void
    discrepancies: ObjectType | null,
    setDiscrepancies?: (obj: ObjectType) => void

    reportId?: string
    dbDiscrepancy?: boolean
    prereport?: boolean
}

export const DiscrepanciesAdd = ({ mainData, closeModal, discrepancies, setDiscrepancies,
    reportId,
    dbDiscrepancy,
    prereport=false
}: Props) => {

    const [description, setDescription] = useState<string>("")
    const [discrepancy, setDiscrepancy] = useState<string>("null")
    const [errorSelector, setErrorSelector] = useState<string | null>(null)
    const [errorDescription, setErrorDescription] = useState<string | null>(null)

    const [openSelect, setOpenSelect] = useState<boolean>(false)
    const [MAINDATA, setMAINDATA] = useState<ListType[]>([{ label: "0", value: "No items to select" }])

    const { mutate, isLoading } = useAddDiscrepancy()

    useEffect(() => {
        setMAINDATA([{ label: "Select an Item", value: "null" }, ...jsonToPickerSelect(mainData)])
    }, [mainData])


    const addDiscrepancy = async () => {

        if (discrepancy == "null") {
            return setErrorSelector("*Item for discrepancy is required")
        }

        if (description.trim().length === 0) {
            return setErrorDescription("*Description is required")
        }

        if ( discrepancies && discrepancies[discrepancy]) {
            return setErrorSelector("*Already exist on discrepancies")
        }

        dbDiscrepancy
            ?
            mutate({ dataBody: { reportId, discrepancies: { ...discrepancies, [discrepancy]: description } }, prereport } )
            :
            setDiscrepancies && setDiscrepancies({ ...discrepancies, [discrepancy]: description })


        closeModal()
    };


    return (
        <View>
            <View style={{ marginBottom: 15 }}>
                <TextApp size='l' bold style={{ marginBottom: 25 }}>Add Discrepany</TextApp>
                <PickerModal
                    modal={openSelect}
                    openModal={setOpenSelect}
                    LIST={MAINDATA}
                    state=''
                    setState={(text) => {setDiscrepancy(text), setErrorSelector(null)}}
                    outline
                />
                
                <TextApp style={{marginTop: 8}} size='xs' color='danger'>{errorSelector || ""}</TextApp>
                
            </View>

            <TextApp bold style={{ marginBottom: 8 }}>Discrepancy</TextApp>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={styles.textArea}
                    multiline={true}
                    value={description}
                    maxLength={100}
                    onChangeText={(e) => setDescription(e)}
                />
                <TextApp size='xs' color="mute" style={{ marginTop: 10 }}>*100 characters maximum</TextApp>
                <TextApp style={{marginTop: 8}} size='xs' color='danger'>{errorDescription || ""}</TextApp>

            </View>

            <ActionButtons
                isLoading={isLoading}
                action={ addDiscrepancy }
                closeModal={() => closeModal()}
                okText='Add'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        height: 70,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 15,
        borderRadius: 10,
        backgroundColor: inputColor,
    }
});