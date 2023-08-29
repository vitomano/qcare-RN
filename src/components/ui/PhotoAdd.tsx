import React, { useContext, useEffect, useState } from 'react'
import ImageView from "react-native-image-viewing";
import { ImageSource } from 'react-native-image-viewing/dist/@types'

import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { done, doneBg, inactive, inputColor } from '../../theme/variables';
import { globalStyles } from '../../theme/globalStyles';
import { DataPrereport, DetailObject, ImageTemp, ImageType, PalletState } from '../../interfaces/intakes.reports';
import { useCameraLibrary } from '../../hooks/useCameraLibrary';
import { IntakeContext } from '../../context/IntakeContext';
import { DetailName } from '../../interfaces/interfaces';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { TextApp } from './TextApp';
import { CentredContent } from '../CenterContent';

interface Props {
    photo: ImageTemp | null,
    pallet: DataPrereport | PalletState,
    item: DetailObject,
    detailName: DetailName,

    addTempPhoto: (pid: string, file: ImageTemp, detailName: DetailName, nameId: string) => void;
    removeTempPhoto: (pid: string, detailName: DetailName, name: string) => void;

}

export const PhotoAdd = ({ photo, pallet, item, detailName, addTempPhoto, removeTempPhoto }: Props) => {

    const [modalImage, setModalImage] = useState<boolean>(false)
    const [modalDeleteImage, setModalDeleteImage] = useState<boolean>(false)

    const [carouselImages, setCarouselImages] = useState<ImageSource[]>([])

    let itemName = ["weight_check"].includes(item.name)

    useEffect(() => {
        setCarouselImages([{ uri: photo?.uri }])
        return () => setCarouselImages([])
    }, [photo])

    const { showImagePicker } = useCameraLibrary(1, (photo ? 1 : 0))

    const selectPhoto = () => {
        showImagePicker((res) => {
            addTempPhoto(pallet.id, res.files[0], detailName, item.name)
        })
    };

    const deleteAction = () => removeTempPhoto(pallet.id, detailName, item.name);

    return (
        <>
            {/* {
                modalImg &&
                <ModalPhoto
                    photo={photo}
                    openModal={setModalImg}
                    action={removeTempFile}
                />
            } */}
            {
                photo &&

                <ImageView
                    images={carouselImages}
                    imageIndex={0}
                    visible={modalImage}
                    onRequestClose={() => setModalImage(false)}
                    HeaderComponent={() => (

                        <View style={{ ...globalStyles.flexBetween, marginHorizontal: 20, marginTop: 40 }}>
                            <View>
                                {
                                    deleteAction &&
                                    <>
                                        <TouchableOpacity
                                            activeOpacity={.9}
                                            onPress={() => setModalDeleteImage(true)}
                                            style={{ backgroundColor: "#ed3c36", width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 20 }}
                                        >
                                            <Icon name='trash-outline' size={22} color="#fee1e8" />
                                        </TouchableOpacity>

                                        <ModalConfirmation
                                            message={`Do you want to delete this image`}
                                            action={() => {
                                                deleteAction()
                                                setModalDeleteImage(false)
                                                setModalImage(false)
                                            }}
                                            modal={modalDeleteImage}
                                            openModal={setModalDeleteImage}
                                        />
                                    </>
                                }
                            </View>

                            <TouchableOpacity
                                activeOpacity={.9}
                                onPress={() => setModalImage(false)}
                            >
                                <Icon name='close-outline' size={30} color="white" />
                            </TouchableOpacity>
                        </View>


                    )}
                    FooterComponent={() => (
                        <CentredContent style={{ marginBottom: 40 }}>
                            <TextApp color='white' center style={{ marginBottom: 5 }}>{item.label}</TextApp>
                            {/* <TextApp color='white' center>{imageIndex + 1} / {carouselImages.length}</TextApp> */}
                        </CentredContent>
                    )}
                />
            }


            {
                photo
                    ?
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => setModalImage(true)}
                        style={{ backgroundColor: doneBg, width: 40, height: 40, borderRadius: 10, marginLeft: 5, ...globalStyles.flexCenter, alignSelf: itemName ? 'flex-start' : 'center' }}
                    >
                        <Icon name="camera-outline" size={25} color={done} style={{ alignSelf: "center" }} />
                    </TouchableOpacity>


                    :
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={selectPhoto}
                        style={{ backgroundColor: inputColor, width: 40, height: 40, borderRadius: 10, marginLeft: 5, ...globalStyles.flexCenter, alignSelf: itemName ? 'flex-start' : 'center' }}
                    >
                        <Icon name="camera-outline" size={25} color={inactive} style={{ alignSelf: "center" }} />
                    </TouchableOpacity>
            }

        </>
    )
}
