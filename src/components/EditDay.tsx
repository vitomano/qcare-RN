import React, { useState } from 'react'
import { TextInput, View } from 'react-native'

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { Test } from '../interfaces/interface.lifeTest';
import { inputStyles } from '../theme/inputStyles';
import { PickerModal } from './modals/PickerModal'
import { CONDITIONS } from '../data/conditions'
import ButtonStyled from './ui/ButtonStyled'

import { useEditDay } from '../api/useLifeTest';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Tags } from './ui/Tags';


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
            }).then(() => setModalEditDay(false))    
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
                <View style={{ marginBottom: 30 }}>
                    <Tags
                        tags={conditions}
                        setTags={setConditions}
                    />
                </View>
            }

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
