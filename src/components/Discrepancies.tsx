import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TextApp } from './ui/TextApp'
import { inputStyles } from '../theme/inputStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import { red } from '../theme/variables';
import { MainData, ObjectArray, ObjectType } from '../interfaces/intakes.reports';
import { objectToArray } from '../helpers/objToArray';

import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { jsonKeyToString } from '../helpers/jsonToString';
import { globalStyles } from '../theme/globalStyles';
import { ModalContainer } from './modals/ModalContainer';
import { DiscrepanciesAdd } from './DiscrepanciesAdd';
import { DiscrepanciesEdit } from './DiscrepanciesEdit';

interface Props {
    discrepancies: ObjectType | null
    setDiscrepancies?: (obj: ObjectType | null) => void
    mainData: MainData

    reportId?: string
    dbDiscrepancy?: boolean
    prereport?: boolean
}

export const Discrepancies = ({ discrepancies, setDiscrepancies, mainData,
    reportId,
    dbDiscrepancy,
    prereport
}: Props) => {

    const [singleDiscrepancy, setSingleDiscrepancy] = useState<ObjectArray | null>(null)
    const [modalDiscrepancy, setModalDiscrepancy] = useState<boolean>(false)
    const [modalEditDiscrepancy, setModalEditDiscrepancy] = useState<boolean>(false)

    const editDiscrepancy = (discrepancy: any) => {
        setSingleDiscrepancy(discrepancy)
        setModalEditDiscrepancy(true)
    };

    return (
        <>

            <ModalContainer
                modal={modalDiscrepancy}
                openModal={setModalDiscrepancy}
            >
                <DiscrepanciesAdd
                    mainData={mainData}
                    closeModal={() => setModalDiscrepancy(false)}
                    discrepancies={discrepancies}
                    setDiscrepancies={setDiscrepancies}

                    reportId={reportId}
                    dbDiscrepancy={dbDiscrepancy}
                    prereport={prereport}
                />
            </ModalContainer>

            {
                (singleDiscrepancy && discrepancies) &&
                <ModalContainer
                    modal={modalEditDiscrepancy}
                    openModal={setModalEditDiscrepancy}
                >
                    <DiscrepanciesEdit
                        singleDiscrepancy={singleDiscrepancy}
                        closeModal={() => setModalEditDiscrepancy(false)}
                        discrepancies={discrepancies}
                        setDiscrepancies={setDiscrepancies}

                        reportId={reportId}
                        dbDiscrepancy={dbDiscrepancy}
                        prereport={prereport}
                    />
                </ModalContainer>
            }


            <View style={{ ...inputStyles.inputContainer, marginTop: 5, marginBottom: 5 }}>
                <TextApp style={{ marginRight: 10 }}>Discrepancies</TextApp>
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => setModalDiscrepancy(true)}
                >
                    <Icon name="add-circle-outline" size={25} color={red} />
                </TouchableOpacity>
            </View>

            {
                discrepancies &&
                <>
                    {
                        objectToArray(discrepancies).map(discrepancy => (
                            <TouchableOpacity
                                activeOpacity={.7}
                                key={uuidv4()}
                                onPress={() => editDiscrepancy(discrepancy)}
                                style={{ ...globalStyles.shadow }}
                            >
                                <View style={{ ...globalStyles.card, padding: 10 }}>
                                    <TextApp color='danger' bold>
                                        {jsonKeyToString(discrepancy.key) || "--"}:
                                        <TextApp>{" " + discrepancy.value || "--"}</TextApp>
                                    </TextApp>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </>
            }

            <View style={{ marginBottom: 15 }} />
        </>
    )
}
