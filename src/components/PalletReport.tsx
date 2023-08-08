import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SCORE } from '../data/selects'
import { ImageTemp, Pallet } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { PickerModal } from './modals/PickerModal'
import { TextApp } from './ui/TextApp';
import { PalletNum } from './ui/PalletNum';
import { InfoPrereport } from './InfoPrereport';
import { GrowerInfo } from './GrowerInfo';
import { alertMsg } from '../helpers/alertMsg';
import { PrereportInfo } from './ui/PrereportInfo';
import { useDeleteReportImage, useEditReport, useUploadImages } from '../api/useReport';
import { ImageButton } from './ui/ImageButton';
import { blue, lightGrey } from '../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContainer } from './modals/ModalContainer';
import ButtonStyled from './ui/ButtonStyled';
import { ChartPie } from './ui/ChartPie';
import { useQueryClient } from '@tanstack/react-query';
import { useCameraLibrary } from '../hooks/useCameraLibrary';
import { ImageSelected } from './ImageSelected';
import { ImageGalleryViewing } from './ImageGalleryViewing';


interface Props {
    pallet: Pallet,
    i: number,
    repId: string,
    format?: number
}

export const PalletReport = ({ pallet, i, repId, format }: Props) => {

    const { mutate } = useEditReport()
    const { mutateAsync: mutateDeleteImage, isLoading:isDeleting } = useDeleteReportImage()
    const { mutateAsync, isLoading } = useUploadImages()

    const queryClient = useQueryClient()

    const [modalScore, setModalScore] = useState(false)
    const [modalImage, setModalImage] = useState(false)
    const [images, setImages] = useState<ImageTemp[]>([])

    const editStatus = async (val: string) => {

        if (val === pallet.score) return
        if (val === "0") return

        try {
            const editItem = {
                score: val,
                reportId: repId,
                palletId: pallet.pid,
            }

            mutate(editItem)

        } catch (error) {
            console.log(error)
            alertMsg("Error", "Something went wrong")
        }
    }

    const removeReportImage = async(key: string, key_low: string) => {

        await mutateDeleteImage({
            reportId: repId,
            palletId: pallet.pid,
            key,
            key_low
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['reports'])
            }
        })

    };

    const { showImagePicker, allowed } = useCameraLibrary(10, images.length)

    const selectImages = () => {
        showImagePicker((res) => {
            setImages([...images, ...res.files])
        })
    };

    const removeTempFiles = (pid: string, name: string) => {
        const newImageArray = images.filter( img => img.name !== name )
        setImages(newImageArray)
    };

    const uploadImages = async () => {

        if (images.length === 0) return setModalImage(false)

        try {
            await mutateAsync({
                reportId: repId,
                palletId: pallet.pid,
                images
            })
        } catch (error) {
            console.log(error)
        } finally { setImages([]), setModalImage(false) }
    };

    return (
        <View
            style={{ ...globalStyles.shadow, marginVertical: 5 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween, marginBottom: 15 }}>
                    <PalletNum num={i + 1} />
                </View>

                {
                    pallet.addGrower &&
                    <View style={{ marginVertical: 10 }}>
                        <GrowerInfo
                            pallet={pallet}
                            repId={repId}
                        />
                    </View>
                }

                {
                    pallet.prereport &&
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
                                    format={format}
                                />
                            ))
                        }

                    </View>
                }

                {
                    pallet.details.pallgrow &&
                    <View>
                        <ChartPie
                            pallgrow={pallet.details.pallgrow}
                        />
                    </View>
                }

                {
                    pallet.images.length > 0 &&
                    <View style={{ marginBottom: 30 }}>
                        <ImageGalleryViewing images={pallet.images} deleteAction={removeReportImage} isDeleting={isDeleting}/>
                    </View>
                }

                <View style={{ marginBottom: 20, alignSelf: "center" }} >
                    <View
                        style={{ alignItems: "center", justifyContent: "center", backgroundColor: blue, width: 50, height: 50, borderRadius: 50 }}
                    >
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setModalImage(true)}
                        >
                            <Icon name="camera" color="#fff" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ModalContainer
                    modal={modalImage}
                    openModal={setModalImage}
                >
                    <View>
                    {
                        images.length > 0 &&
                        <View style={{ marginTop: 30 }}>
                            <ImageSelected images={images} deleteAction={removeTempFiles} pid="" grid={4} />
                        </View>
                    }
                    </View>
                    <View style={{ marginVertical: 25 }}>
                        <ImageButton openLibrary={selectImages} max={allowed} />
                    </View>

                    <View style={{ ...globalStyles.flexBetween }}>
                        <ButtonStyled
                            onPress={() => setModalImage(false)}
                            text='Cancel'
                            outline
                            blue
                            width={48}
                            btnDisabled={isLoading}
                        />
                        <ButtonStyled
                            onPress={uploadImages}
                            text='Add Images'
                            blue
                            width={48}
                            loading={isLoading}
                            btnDisabled={isLoading}
                        />
                    </View>
                </ModalContainer>


                <View style={{
                    ...globalStyles.flexRow, marginBottom: 5,
                    paddingTop: 20,
                    borderTopColor: lightGrey,
                    borderTopWidth: .5
                }}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    detailSection: {
        paddingBottom: 15,
        marginBottom: 20
    }
});