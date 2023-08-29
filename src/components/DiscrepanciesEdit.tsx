import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { TextApp } from './ui/TextApp'
import { inputColor, red, redBg2 } from '../theme/variables';
import { ObjectArray, ObjectType } from '../interfaces/intakes.reports';
import { jsonKeyToString } from '../helpers/jsonToString';
import { ActionButtons } from './ui/ActionButtons';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/globalStyles';
import { useAddDiscrepancy } from '../api/useDiscrepancy';

interface Props {
    singleDiscrepancy: ObjectArray
    closeModal: () => void
    discrepancies: ObjectType,
    setDiscrepancies?: (obj: ObjectType | null) => void

    reportId?: string
    dbDiscrepancy?: boolean
    prereport?: boolean
}

export const DiscrepanciesEdit = ({ closeModal, singleDiscrepancy, discrepancies, setDiscrepancies,
    reportId,
    dbDiscrepancy,
    prereport=false
}: Props) => {

    const [description, setDescription] = useState<string>("")
    const [discrepanciesClon, setDiscrepanciesClon] = useState<ObjectType>({})
    const [errorDescription, setErrorDescription] = useState<string | null>(null)

    const { mutate, isLoading } = useAddDiscrepancy()


    useEffect(() => {
        setDescription(singleDiscrepancy?.value || "")
        setDiscrepanciesClon( discrepancies )
    }, [singleDiscrepancy])

    const editDiscrepancy = async () => {
        if (!singleDiscrepancy) return

        if (description.trim().length === 0) {
            return setErrorDescription("*Description is required")
        }

        dbDiscrepancy
            ?
            mutate({ dataBody: { reportId, discrepancies: { ...discrepancies, [singleDiscrepancy.key]: description } }, prereport })
            :
            setDiscrepancies && setDiscrepancies({ ...discrepancies, [singleDiscrepancy.key]: description })

        closeModal()
    };


    const removeDiscrepancy = (key:string) => {

        if (!discrepanciesClon) return

        delete discrepanciesClon[key]

        const finalDisc = Object.keys(discrepanciesClon).length === 0
            ? null
            : discrepanciesClon

        dbDiscrepancy
            ?
            mutate( { dataBody: { reportId, discrepancies:finalDisc }, prereport } )
            :
            setDiscrepancies && setDiscrepancies(finalDisc)

        closeModal()
    };


    return (
        <View style={{ position: 'relative' }}>

            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => removeDiscrepancy( singleDiscrepancy.key )}
                style={{ ...globalStyles.flexCenter, zIndex:1, borderRadius:50, width:32, height:32, right:0, top: 0, position: "absolute", backgroundColor: redBg2}}
            >
                <Icon name='trash-outline' color={red} size={20} />
            </TouchableOpacity>

            <View style={{ marginBottom: 20 }}>
                <TextApp size='l' bold>{jsonKeyToString(singleDiscrepancy.key || '--')}</TextApp>
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
                <TextApp style={{ marginTop: 8 }} size='xs' color='danger'>{errorDescription || ""}</TextApp>

            </View>

            <ActionButtons
                isLoading={isLoading}
                action={editDiscrepancy}
                closeModal={() => closeModal()}
                okText='Edit'
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