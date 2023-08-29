import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '../context/AuthContext'
import { Teams } from '../interfaces/interfaces.auth'
import { IntakeCSV, ObjectType } from '../interfaces/intakes.reports'
import { ListType, PickerModal } from './modals/PickerModal'


interface Props {
    closeModal: () => void
    assignToAll: (id:string) => void
    setAssign: (id:boolean) => void
}

export const AssignTeam = ({ closeModal, assignToAll, setAssign }: Props) => {

    const { user } = useContext(AuthContext)

    const [modalTeam, setModalTeam] = useState<boolean>(false)
    const [selectedTeam, setSelectedTeam] = useState<string>("0")
    const [TEAMS, setTEAMS] = useState<ListType[]>([])

    useEffect(() => {
        const allTeams = user?.teams.map(team => ({ value: team._id, label: team.name })) ?? [{ value: "0", label: "No Teams" }]
        setTEAMS( allTeams )
        setSelectedTeam( allTeams[0].value )
    }, [ user ])

    const handleTeam = (team: string) => {
        setSelectedTeam(team)
    };

    return (
        <>
            <View style={{ marginBottom: 5 }}>
                <TextApp size='m' bold style={{ marginBottom: 10 }}>Team</TextApp>
                {
                    TEAMS.length > 0 &&
                    <PickerModal
                    modal={modalTeam}
                    openModal={setModalTeam}
                    LIST={TEAMS}
                    setState={handleTeam}
                    state={selectedTeam}
                    outline
                    />
                }
                <TextApp size='s' color='mute' style={{marginTop: 10}}>*This action will be applied to all intakes</TextApp>
            </View>

            <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                <ButtonStyled
                    onPress={() => {closeModal(), setAssign(false)}}
                    text='Cancel'
                    outline
                    width={48}
                    danger
                />
                <ButtonStyled
                    onPress={() => assignToAll( selectedTeam )}
                    text='Assign'
                    width={48}
                />
            </View>

        </>
    )
}
