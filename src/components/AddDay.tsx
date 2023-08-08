import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { Test } from '../interfaces/interface.lifeTest';
import { dateFormat } from '../helpers/dateFormat';
import { inputStyles } from '../theme/inputStyles';
import { CONDITIONS } from '../data/conditions'
import Icon from 'react-native-vector-icons/Ionicons'
import { darkGrey } from '../theme/variables';
import ButtonStyled from './ui/ButtonStyled'
import { useAddDay } from '../api/useLifeTest';
import { LoadingScreen } from '../pages/LoadingScreen';
import { ImageButton } from './ui/ImageButton'
import { useQueryClient } from '@tanstack/react-query'
import { PickerModalMultiselect } from './modals/PickerModalMultiselect';
import Toast from 'react-native-toast-message'
import { ImageSelected } from './ImageSelected'
import { ImageTemp } from '../interfaces/intakes.reports'
import { useCameraLibrary } from '../hooks/useCameraLibrary'


interface Props {
    lifeTestId: string
    days: Test[]
    setModalAddDay: (b: boolean) => void
}

export const AddDay = ({ lifeTestId, days, setModalAddDay }: Props) => {

    const queryClient = useQueryClient()

    const { mutateAsync, isLoading } = useAddDay()

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [openCondition, setOpenCondition] = useState(false)
    const [conditions, setConditions] = useState<string[]>([])
    const [images, setImages] = useState<ImageTemp[]>([])

    const [temperature, setTemperature] = useState<string>("")

    const { showImagePicker, allowed } = useCameraLibrary(3, images.length)

    const selectImages = () => {
       showImagePicker( (res) => {
        setImages([...images, ...res.files])
       })
    };

    const removeTempFiles = ( name: string) => {
        const newImageArray = images.filter( img => img.name !== name )
        setImages(newImageArray)
    };

    const sendAddDay = async () => {

        try {
            await mutateAsync({
                images,
                conditions,
                lifeTestId,
                temperature,
                date,
                dayNum: days.length + 1
            })

            queryClient.resetQueries((['lifeTests']))

            Toast.show({
                type: 'success',
                text1: 'Day added successfully'
            })
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Something went wrong'
            })
        } finally { setModalAddDay(false) }

    };

    if (isLoading) return <LoadingScreen text='Adding day...' />

    return (
        <>
            <TextApp size='l' bold style={{ marginBottom: 20 }}>Day {days.length + 1}</TextApp>

            <View style={{ ...globalStyles.flexRow, marginBottom: 15 }}>
                <TextApp size='m' style={{ width: "50%" }}>Date</TextApp>

                <View style={{ ...inputStyles.input, flex: 1, width: "100%" }}>
                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={() => setOpen(true)}>
                        <TextApp>{dateFormat(date) || '--'}</TextApp>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>

            <View style={{ ...globalStyles.flexRow, marginBottom: 15 }}>
                <TextApp size='m' style={{ width: "50%" }}>Temperature</TextApp>

                <TextInput
                    keyboardType='number-pad'
                    autoCapitalize="none"
                    value={temperature}
                    autoCorrect={false}
                    style={{ ...inputStyles.input, flex: 1, fontWeight: "bold" }}
                    onChangeText={(e) => setTemperature(e as string)}
                />
            </View>


            <View style={{ ...globalStyles.flexRow }}>
                <TextApp size='m' style={{ width: "50%" }}>Conditions</TextApp>

                <PickerModalMultiselect
                    title="Select conditions"
                    modal={openCondition}
                    openModal={setOpenCondition}
                    LIST={CONDITIONS}
                    setState={setConditions}
                    stateArray={conditions}
                />

            </View>
            {
                conditions.length > 0 &&
                <View style={{ ...globalStyles.flexRow, flexWrap: "wrap", marginTop: 15 }}>
                    {
                        conditions.map(cond => (
                            <View key={cond}
                                style={{ ...globalStyles.flexRow, marginVertical: 3, marginRight: 5, backgroundColor: darkGrey, borderRadius: 50, paddingVertical: 3, paddingHorizontal: 10 }}
                            >
                                <TextApp size='s' color='white'>{cond}</TextApp>

                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
                                    onPress={() => setConditions(conditions.filter(item => item !== cond))}
                                >
                                    <Icon name='close' size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            }

            {
                images.length > 0 &&
                <View style={{ marginTop: 30 }}>
                    <ImageSelected images={images} deleteAction={removeTempFiles} pid="" grid={3}/>
                </View>
            }

            <View style={{ marginVertical: 25 }} >
                <ImageButton openLibrary={selectImages} max={allowed} disabled={ allowed === 0 }/>
            </View>



            <View style={{ ...globalStyles.flexBetween }}>
                <ButtonStyled
                    onPress={() => setModalAddDay(false)}
                    text='Cancel'
                    outline
                    blue
                    width={48}
                />
                <ButtonStyled
                    onPress={sendAddDay}
                    text='Add day'
                    blue
                    width={48}
                />
            </View>

        </>
    )
}
