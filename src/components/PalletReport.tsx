import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';

import { SCORE } from '../data/selects'
import { Pallet } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { PickerModal } from './modals/PickerModal'
import { Status } from '../interfaces/interfaces';
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { InfoPrereport } from './InfoPrereport';
import { GrowerInfo } from './GrowerInfo';
import { alertMsg } from '../helpers/alertMsg';
import { useEditPreCondition } from '../api/usePrereport';
import { ImageGallery } from './ImageGallery';
import { PrereportInfo } from './ui/PrereportInfo';
import { useEditRepGrower } from '../api/useReport';

interface Props {
    pallet: Pallet,
    i: number,
    repId: string,
}

export const PalletReport = ({ pallet, i, repId }: Props) => {

    const { mutate } = useEditPreCondition()

    const [modalScore, setModalScore] = useState(false)

    // const [uploading, setUploading] = useState(false)

    // const [removeModal, setRemoveModal] = useState(false)

    const editStatus = async (val: string, status: Status) => {

        try {
            let newValue = null
            if (status === "score") newValue = val
            if (status === "grade") newValue = val
            if (status === "action") newValue = val

            const editItem = {
                item: status,
                value: newValue,
                reportId: repId,
                palletId: pallet.pid,
            }

            mutate(editItem)

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
                <View style={{ ...globalStyles.flexBetween, marginBottom: 15 }}>

                    <PalletNum num={i + 1} />

                    {/* <TouchableOpacity
                        onPress={() => setRemoveModal(true)}
                    >
                        <TextApp color="danger" size='s'>remove</TextApp>
                        <ModalConfirmation
                            modal={removeModal}
                            openModal={setRemoveModal}
                            action={() => mutateRemove(pallet.pid)}
                            message="Are you sure you want to remove this pallet?"
                        />
                    </TouchableOpacity> */}
                </View>

                {
                    pallet.prereport !== null &&
                    < PrereportInfo prereport={pallet.prereport} />
                }

                {
                    pallet.details?.labels?.length > 0 &&
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
                                />
                            ))
                        }

                    </View>
                }

                {
                    pallet.images.length > 0 &&
                    <View style={{ marginBottom: 30 }}>
                        <ImageGallery images={pallet.images} />
                    </View>
                }

                <View style={{ marginBottom: 20 }}>

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

                {
                    pallet.addGrower !== null &&
                    <View style={{ marginBottom: 20 }}>
                        <GrowerInfo
                            pallet={ pallet }
                            repId={ repId }
                        />
                    </View>
                }

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