import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';

import { ACTION, GRADE, SCORE } from '../data/selects'
import { PrereportPallet } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { PickerModal } from './modals/PickerModal'
import { Status } from '../interfaces/interfaces';
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { InfoPrereport } from './InfoPrereport';
import { GrowerInfo } from './GrowerInfo';
import { alertMsg } from '../helpers/alertMsg';
import { useDeletePrereportImage, useEditPreCondition } from '../api/usePrereport';
import { ImageGalleryViewing } from './ImageGalleryViewing';
import { usePhoto } from '../hooks/usePhoto';
import { PhotoGallery } from './PhotoGallery';

interface Props {
    pallet: PrereportPallet,
    i: number,
    repId: string,
}

export const PalletPrereport = ({ pallet, i, repId }: Props) => {

    const { mutateAsync } = useEditPreCondition()
    const { mutate: mutateDeleteImage, isLoading } = useDeletePrereportImage()


    const [modalGrade, setModalGrade] = useState(false)
    const [modalAction, setModalAction] = useState(false)
    const [modalScore, setModalScore] = useState(false)

    const { photos } = usePhoto(pallet)

    const editStatus = async (val: string, status: Status) => {

        if (val === "0") return

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

        try {
            await mutateAsync(editItem)
        } catch (error) {
            console.log(error)
            alertMsg("Error", "Something went wrong")
        }
    }


    const removeReportImage = (key: string, key_low: string) => {
        mutateDeleteImage({
            reportId: repId,
            palletId: pallet.pid,
            key,
            key_low
        })
    };

    return (
        <View
            style={{ ...globalStyles.shadow, marginVertical: 5 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween, marginBottom: 20 }}>
                    <PalletNum num={i + 1} />
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
                                    prereport={true}
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
                                    prereport={true}

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
                                    prereport={true}
                                />
                            ))
                        }

                    </View>
                }

                {
                    photos.length > 0 &&
                    <PhotoGallery
                        photos={photos}
                        pid={pallet.pid}
                        reportId={repId}
                        prereport
                    />
                }

                {
                    pallet.images.length > 0 &&
                    <View>
                        <ImageGalleryViewing images={pallet.images} deleteAction={removeReportImage} isDeleting={isLoading} />
                    </View>
                }
                {
                    (photos.length > 0 || pallet.images.length > 0) &&
                    <View style={{ marginBottom: 30 }} />
                }

                <View style={{ marginBottom: 10 }}>

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
                    <View style={{ ...globalStyles.flexRow }}>
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
                    <View style={{ marginBottom: 10, marginTop: 20 }}>
                        <GrowerInfo
                            pallet={pallet}
                            repId={repId}
                            prereport={true}
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