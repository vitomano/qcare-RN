import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ACTION, GRADE, SCORE } from '../data/selects'
import { PrereportPallet } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { PickerModal } from './modals/PickerModal'
import { Status } from '../interfaces/interfaces';
import { ModalConfirmation } from './modals/ModalConfirmation';
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { InfoPrereport } from './InfoPrereport';
import { GrowerInfo } from './GrowerInfo';
import qcareApi from '../api/qcareApi';
import { alertMsg } from '../helpers/alertMsg';

interface Props {
    pallet: PrereportPallet,
    i: number,
    repId: string,
    fetchData: () => void
    // refresh: boolean
    // setRefresh: (b: boolean) => void
}

export const PalletPrereport = ({ pallet, i, repId, fetchData }: Props) => {

    const [modalGrade, setModalGrade] = useState(false)
    const [modalAction, setModalAction] = useState(false)
    const [modalScore, setModalScore] = useState(false)

    // const [uploading, setUploading] = useState(false)

    const [removeModal, setRemoveModal] = useState(false)

    const editStatus = async (val: string, status: Status) => {

        try {
            let newValue = null
            if (status === "score") newValue = val
            if (status === "grade") newValue = val
            if (status === "action") newValue = val

            await qcareApi.put('prereport/edit-condition', {
                item: status,
                value: newValue,
                reportId: repId,
                palletId: pallet.pid,
            })

            fetchData()

        } catch (error) {
            console.log(error)
            alertMsg("Error", "Something went wrong")
        }
    }


    return (
        <View
            style={{ ...globalStyles.shadow, marginVertical: 5 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween, marginBottom: 20 }}>

                    <PalletNum num={i + 1} />

                    <TouchableOpacity
                        onPress={() => setRemoveModal(true)}
                    >
                        <TextApp color="danger" size='s'>remove</TextApp>
                        <ModalConfirmation
                            modal={removeModal}
                            openModal={setRemoveModal}
                            // action={() => removePallet(pallet.pid)}
                            action={() => console.log(pallet.pid)}
                            message="Are you sure you want to remove this pallet?"
                        />
                    </TouchableOpacity>
                </View>

                {
                    pallet.details?.labels.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Labels</TextApp>
                        {
                            pallet.details.labels.map((lab, i) => (
                                <InfoPrereport
                                    key={i}
                                    pallet={pallet}
                                    item={lab}
                                    detailName="labels"
                                    repId={repId}
                                    // refresh={refresh}
                                    // setRefresh={setRefresh}
                                    fetchData={fetchData}
                                />
                            ))
                        }

                    </View>
                }

                {
                    pallet.details?.appareance.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Appearance</TextApp>
                        {

                            pallet.details.appareance.map((app, i) => (
                                <InfoPrereport
                                    key={i}
                                    pallet={pallet}
                                    item={app}
                                    detailName="appareance"
                                    repId={repId}
                                    // refresh={refresh}
                                    // setRefresh={setRefresh}
                                    fetchData={fetchData}
                                />
                            ))
                        }

                    </View>
                }

                {
                    pallet.details?.pallgrow?.length > 0 &&
                    <View style={styles.detailSection}>
                        <TextApp bold style={{ marginBottom: 10 }}>Pall/Grower</TextApp>
                        {
                            pallet.details.pallgrow.map((pall, i) => (
                                <InfoPrereport
                                    key={i}
                                    pallet={pallet}
                                    item={pall}
                                    detailName="pallgrow"
                                    repId={repId}
                                    // refresh={refresh}
                                    // setRefresh={setRefresh}
                                    fetchData={fetchData}
                                />
                            ))
                        }

                    </View>
                }

                <View style={{ marginBottom: 20 }}>

                    <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                        <TextApp style={{ width: "50%" }}>QC Appreciation</TextApp>

                        <PickerModal
                            modal={modalGrade}
                            openModal={setModalGrade}
                            LIST={GRADE}
                            setState={editStatus}
                            state={pallet.grade}
                            option="grade"
                            color={true}
                        />
                    </View>
                    <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                        <TextApp style={{ width: "50%" }}>Suggested commercial action</TextApp>

                        <PickerModal
                            modal={modalAction}
                            openModal={setModalAction}
                            LIST={ACTION}
                            setState={editStatus}
                            state={pallet.action}
                            option="action"
                            color={true}
                        />
                    </View>
                    <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                        <TextApp style={{ width: "50%" }}>Score</TextApp>

                        <PickerModal
                            modal={modalScore}
                            openModal={setModalScore}
                            LIST={SCORE}
                            setState={editStatus}
                            state={pallet.score}
                            option="score"
                            color={true}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 20 }}>

                    <GrowerInfo
                        pallet={pallet}
                        repId={repId}
                        fetchData={fetchData}
                    />

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailSection: {
        paddingBottom: 15,
        marginBottom: 20
    }
});