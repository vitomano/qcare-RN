import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { Test } from '../interfaces/interface.lifeTest';
import { inputStyles } from '../theme/inputStyles';
import { CONDITIONS } from '../data/conditions'
import ButtonStyled from './ui/ButtonStyled'

import { useEditDay } from '../api/useLifeTest';
import { LoadingScreen } from '../pages/LoadingScreen';
import { PickerModalMultiselect } from './modals/PickerModalMultiselect';
import { darkGrey, text } from '../theme/variables'
import { Num } from './ui/Num'
import { dateFormat } from '../helpers/dateFormat'


interface Props {
    lifeId: string
    day: Test
    setModalEditDay: (b: boolean) => void
}

export const EditDay = ({ day, lifeId, setModalEditDay }: Props) => {

    const { mutateAsync, isLoading } = useEditDay()

    const [temperature, setTemperature] = useState<string>(day.temperature)
    const [conditions, setConditions] = useState<string[]>(day.conditions)

    const [openCondition, setOpenCondition] = useState(false)

    const save = async () => {
        await mutateAsync({
            lifeId,
            dayId: day._id,
            conditions,
            temperature
        }).then(() => setModalEditDay(false))
    };

    if (isLoading) return <LoadingScreen text='Editing day...' />

    return (
        <>
            <View style={{ ...globalStyles.flexRow, paddingBottom: 15, marginBottom: 20, borderBottomWidth: .5, borderBottomColor: text }}>
                <Num size='m' num={day.day} style={{ marginRight: 5 }} />
                <TextApp size='m' bold>{dateFormat(day.day_date)}</TextApp>
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


            <View style={{ ...globalStyles.flexRow, marginBottom: 25 }}>
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

            <View style={{ ...globalStyles.flexBetween }}>
                <ButtonStyled
                    onPress={() => setModalEditDay(false)}
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
