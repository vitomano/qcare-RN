import React, { useState } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAddLifeImage, useDeleteImage } from '../../api/useLifeTest'
import { Test } from '../../interfaces/interface.lifeTest'
import { globalStyles } from '../../theme/globalStyles'
import { bgColor, blue, darkGrey, mediumGrey } from '../../theme/variables'
import { ImageGallery } from '../ImageGallery'
import { TextApp } from './TextApp'

import Toast from 'react-native-toast-message'
import { ModalBlock } from '../modals/ModalBlock'
import { EditDay } from '../EditDay'
import { dateFormat } from '../../helpers/dateFormat'
import { ModalContainer } from '../modals/ModalContainer';
import { ImageButton } from './ImageButton'
import ButtonStyled from './ButtonStyled'
import { Asset, launchImageLibrary } from 'react-native-image-picker'


interface Props {
    lifeId: string
    index: number
    day: Test
}

export const DayCard = ({ index, day, lifeId }: Props) => {

    const [modalEditDay, setModalEditDay] = useState(false)
    const [modalAddImg, setModalAddImg] = useState(false)
    const [images, setImages] = useState<Asset[]>([])

    const { mutate } = useDeleteImage()
    const { mutateAsync: mutateAddImg, isLoading } = useAddLifeImage()

    const removeLifeImage = (key: string, key_low: string) => {

        mutate({
            lifeId,
            testId: day._id,
            key,
            key_low
        }, {
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Image has been deleted'
                })
            },
            onError: () => {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong'
                })
            },
        })
    };


    const addImage = async() => {

        await mutateAddImg({
            lifeId,
            dayId: day._id,
            images
        }).then(()=>setModalAddImg(false))
    };


    const openLibrary = () => {

        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0,
        }, (res) => {
            setImages([])
            if (res.didCancel) return
            if (!res.assets) return

            const images =
                res.assets.length > 0
                    ? (res?.assets!).map(image => {
                        return {
                            uri: Platform.OS === 'ios' ? image?.uri?.replace('file://', '') : image.uri || undefined,
                            type: image.type,
                            name: image.fileName
                        }
                    })
                    : []
            if (images.length > 3 - day.images.length) return

            setImages(images)
        })
    };



    return (
        <View style={{ ...globalStyles.shadow, marginBottom: 5 }}>
            <View style={{ ...globalStyles.card, padding: 10 }}>
                <View style={{ ...globalStyles.flexBetween, backgroundColor: bgColor, borderRadius: 50, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10 }}>
                    <TextApp bold>Day {index + 1}</TextApp>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => setModalEditDay(true)}
                    >
                        <Icon size={18} name="create-outline" />
                    </TouchableOpacity>


                    <ModalBlock
                        modal={modalEditDay}
                        openModal={setModalEditDay}
                        style={{ padding: 20 }}
                    >
                        <EditDay
                            lifeId={lifeId}
                            day={day}
                            setModalEditDay={setModalEditDay}
                        />
                    </ModalBlock>


                </View>

                <View style={{ ...globalStyles.flexRow, marginBottom: 7 }}>
                    <TextApp style={{ color: mediumGrey }}>Date: </TextApp>
                    <TextApp size='s'>{dateFormat(day.day_date)}</TextApp>
                </View>

                <View style={{ ...globalStyles.flexRow, marginBottom: 7 }}>
                    <TextApp style={{ color: mediumGrey }}>Temperature: </TextApp>
                    <TextApp size='m' bold> {day.temperature || "--"}°</TextApp>
                </View>

                <View>
                    <TextApp style={{ color: mediumGrey, marginBottom: 3 }}>Conditions: </TextApp>
                    {
                        day.conditions.length === 0
                            ?
                            <TextApp size='s' style={{ marginTop: 2 }}>(None)</TextApp>

                            :
                            <View style={{ ...globalStyles.flexRow, flexWrap: "wrap" }}>
                                {

                                    day.conditions.map((con, index) => (
                                        <View key={index} style={{ backgroundColor: darkGrey, padding: 2, paddingHorizontal: 7, borderRadius: 10, marginRight: 5, marginBottom: 5 }}>
                                            <TextApp size='s' color='white'>{con}</TextApp>
                                        </View>
                                    ))
                                }
                            </View>
                    }
                </View>

                {
                    day.images.length > 0 &&
                    <View style={{ marginTop: 15, marginBottom: 5 }}>
                        <ImageGallery images={day.images} deleteAction={removeLifeImage} />
                    </View>
                }

                {
                    day.images.length < 3 &&
                    <View style={{ marginTop: 10, alignSelf: "center", justifyContent: "center", backgroundColor: blue, width: 50, height: 50, borderRadius: 50 }}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setModalAddImg(true)}
                        >
                            <Icon name="camera" color="#fff" size={30} style={{ textAlign: "center" }} />
                        </TouchableOpacity>
                    </View>
                }



                <ModalContainer
                    modal={modalAddImg}
                    openModal={setModalAddImg}
                >
                    <View>
                        <View style={{ marginVertical: 25 }} >
                            <ImageButton openLibrary={openLibrary} imagesLength={images} max={3 - day.images.length} />
                        </View>



                        <View style={{ ...globalStyles.flexBetween }}>
                            <ButtonStyled
                                onPress={() => setModalAddImg(false)}
                                text='Cancel'
                                outline
                                blue
                                width={48}
                            />
                            <ButtonStyled
                                onPress={addImage}
                                text='Add images'
                                blue
                                loading={isLoading}
                                width={48}
                            />
                        </View>
                    </View>
                </ModalContainer>

            </View>
        </View>
    )
}
