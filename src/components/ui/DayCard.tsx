import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAddLifeImage, useDeleteImage } from '../../api/useLifeTest'
import { Test } from '../../interfaces/interface.lifeTest'
import { globalStyles } from '../../theme/globalStyles'
import { bgColor, blue, darkGrey, mediumGrey } from '../../theme/variables'
import { TextApp } from './TextApp'

import Toast from 'react-native-toast-message'
import { ModalBlock } from '../modals/ModalBlock'
import { EditDay } from '../EditDay'
import { dateFormat } from '../../helpers/dateFormat'
import { ModalContainer } from '../modals/ModalContainer';
import { ImageButton } from './ImageButton'
import ButtonStyled from './ButtonStyled'
import { Num } from './Num'
import { ImageTemp } from '../../interfaces/intakes.reports'
import { ImageSelected } from '../ImageSelected'
import { alertMsg } from '../../helpers/alertMsg'
import { useCameraLibrary } from '../../hooks/useCameraLibrary'
import { ImageGalleryViewing } from '../ImageGalleryViewing'


interface Props {
    lifeId: string
    index: number
    day: Test
}

export const DayCard = ({ index, day, lifeId }: Props) => {

    const [modalEditDay, setModalEditDay] = useState(false)
    const [modalAddImg, setModalAddImg] = useState(false)
    const [images, setImages] = useState<ImageTemp[]>([])

    const { mutate, isLoading:isDeleting } = useDeleteImage()
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


    // Add an additional picture
    const addImage = async () => {

        if(images.length === 0) return alertMsg("Alert", "No image has been loaded")
        
        await mutateAddImg({
            lifeId,
            dayId: day._id,
            images
        }).then(() => setModalAddImg(false))
    };


    const { showImagePicker, allowed } = useCameraLibrary(3, day.images.length + images.length)

    const selectImages = () => {
       showImagePicker( (res) => {
        setImages([...images, ...res.files])
       })
    };

    const removeTempFiles = (pid: string, name: string) => {
        const newImageArray = images.filter( img => img.name !== name )
        setImages(newImageArray)
    };


    return (
        <View style={{ ...globalStyles.shadow, marginBottom: 5 }}>
            <View style={{ ...globalStyles.card, padding: 10 }}>
                <View style={{ ...globalStyles.flexBetween, backgroundColor: bgColor, borderRadius: 50, paddingVertical: 8, paddingHorizontal: 10, marginBottom: 10 }}>

                    <View style={{ ...globalStyles.flexRow }}>
                        <Num num={index + 1} style={{ marginRight: 5 }} />
                        <TextApp bold>{dateFormat(day.day_date)}</TextApp>
                    </View>
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
                        <ImageGalleryViewing images={day.images} deleteAction={removeLifeImage} isDeleting={isDeleting}/>
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
                        {
                            images.length > 0 &&
                            <View style={{ marginTop: 30 }}>
                                <ImageSelected images={images} deleteAction={removeTempFiles} pid="" grid={3} />
                            </View>
                        }



                        <View style={{ marginVertical: 25 }} >
                            <ImageButton openLibrary={selectImages} max={ allowed } disabled={allowed === 0}/>
                        </View>



                        <View style={{ ...globalStyles.flexBetween }}>
                            <ButtonStyled
                                onPress={() => {
                                    setImages([])
                                    setModalAddImg(false)
                                }}
                                text='Cancel'
                                outline
                                blue
                                width={48}
                            />
                            <ButtonStyled
                                onPress={()=>{
                                    addImage()
                                    setImages([])
                                }}
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
