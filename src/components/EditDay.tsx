import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message';

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { Test } from '../interfaces/interface.lifeTest';
import { inputStyles } from '../theme/inputStyles';
import { PickerModal } from './modals/PickerModal'
import { CONDITIONS } from '../data/conditions'
import Icon from 'react-native-vector-icons/Ionicons'
import { darkGrey } from '../theme/variables';
import ButtonStyled from './ui/ButtonStyled'

import { useEditDay } from '../api/useLifeTest';
import { LoadingScreen } from '../pages/LoadingScreen';


interface Props {
    lifeId: string
    day: Test
    setModalEditDay: (b:boolean) => void
}

export const EditDay = ({ day, lifeId, setModalEditDay }: Props) => {

    const { mutateAsync, isLoading } = useEditDay()

    const [temperature, setTemperature] = useState<string>(day.temperature)
    const [conditions, setConditions] = useState<string[]>(day.conditions)

    const [openCondition, setOpenCondition] = useState(false)

    const handleSelect = (e: string) => {
        if (!conditions.some(n => n === e)) {
            setConditions(c => [...c, e])
        }
        setOpenCondition(false)
    };

    const save = async () => {
            await mutateAsync({
                lifeId,
                dayId: day._id,
                conditions,
                temperature
            },
            {
                onSuccess: () => {
                    Toast.show({
                        type: 'success',
                        text1: 'Done!',
                        text2: `Day ${day.day} has been edited`
                    });
                },
                onError: () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Ups!',
                        text2: "Something went wrong"
                    });
                },
                onSettled: () => setModalEditDay(false)
            })
    };

    if (isLoading) return <LoadingScreen text='Adding day...' />

    return (
        <>
            <TextApp size='l' bold style={{ marginBottom: 20 }}>Day {day.day}</TextApp>

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


            <View style={{ ...globalStyles.flexRow, marginBottom: 25 }}>
                <TextApp size='m' style={{ width: "50%" }}>Conditions</TextApp>

                <PickerModal
                    modal={openCondition}
                    openModal={setOpenCondition}
                    LIST={CONDITIONS}
                    setState={handleSelect}
                    state="Select a condition"
                />

            </View>
            {
                conditions.length > 0 &&
                <View style={{ ...globalStyles.flexRow, flexWrap: "wrap", marginBottom: 30 }}>
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

            {/* {
                day.images.length < 3 &&
                <View
                    style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", marginVertical: 25 }}
                >
                    <View
                        style={{ alignItems: "center", justifyContent: "center", backgroundColor: blue, width: 50, height: 50, borderRadius: 50 }}
                    >
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={openLibrary}
                        >
                            <Icon name="camera" color="#fff" size={30} />
                        </TouchableOpacity>
                    </View>
                    {
                        images.length > 0
                            ?
                            <TextApp size='s' style={{ marginTop: 5 }}>{images.length} file/s selected</TextApp>
                            :
                            <TextApp size='s' style={{ marginTop: 5, color: blue }}>Max. {3 - day.images.length} images</TextApp>

                    }
                </View>
            } */}



            <View style={{ ...globalStyles.flexBetween }}>
                <ButtonStyled
                    onPress={()=>setModalEditDay(false)}
                    text='Cancel'
                    outline
                    blue
                    width={48}
                />
                <ButtonStyled
                    onPress={save}
                    text='Save'
                    blue
                    width={48}
                />
            </View>

        </>
    )
}
