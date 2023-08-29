import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'

import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'

import ButtonStyled from './ui/ButtonStyled'

import { AuthContext } from '../context/AuthContext'
import { Teams } from '../interfaces/interfaces.auth'
import { IntakeCSV } from '../interfaces/intakes.reports'
import { ListType, PickerModal } from './modals/PickerModal'


interface Props {
    closeModal: () => void
    addInCharge: (team: string, member: string) => void
    intake: IntakeCSV
}

const membersRol = (allTeam:Teams[], teamId:string ):ListType[] => {
    const members = allTeam.find( team => team._id ===  teamId )?.members ?? []
    return [{ value: "0", label: "All Members" }, ...members.map( member => ({ value: member.uid, label: `${member.name} ${member.lastname} | ${member.email}` }))]
};

export const InChargeSelector = ({ closeModal, addInCharge, intake }: Props) => {

    const { user } = useContext(AuthContext)

    const [modalTeam, setModalTeam] = useState<boolean>(false)
    const [modalMember, setModalMember] = useState<boolean>(false)

    const [selectedTeam, setSelectedTeam] = useState<string>("0")
    const [selectedUser, setSelectedUser] = useState<string>("0")
    const [allTeams, setAllTeams] = useState<Teams[]>([])

    const [TEAMS, setTEAMS] = useState<ListType[]>([])
    const [MEMBERS, setMEMBERS] = useState<ListType[]>([])

    useEffect(() => {
        const all = user ? [...user.teamsAdmin, ...user.teamsUser] : []
        setTEAMS(all.length > 0 ? all.map(team => ({ value: team._id, label: team.name })) : [{ value: "0", label: "No Teams" }] )
        setMEMBERS( membersRol( all, intake.team ?? all[0]._id ) )

        setAllTeams(all || [])

        if (all.length > 0) {
            setSelectedTeam(intake.team ?? all[0]._id)
            setSelectedUser(intake.inCharge ?? "0")
        }
    }, [user, intake])

    const handleTeam = (team: string) => {
        setSelectedTeam(team)
        setMEMBERS( membersRol( allTeams, team ) )
        setSelectedUser("0")
    };

    const handleUser = (user: string) => {
        setSelectedUser(user)
    };

    return (
        <>
            <View style={{ marginBottom: 25 }}>
                <TextApp size='m' bold style={{ marginBottom: 5 }}>Team</TextApp>
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
            </View>

            <View style={{ marginBottom: 25 }}>
                <TextApp size='m' bold style={{ marginBottom: 5 }}>Member</TextApp>
                {
                    MEMBERS.length > 0 &&
                    <PickerModal
                        modal={modalMember}
                        openModal={setModalMember}
                        LIST={MEMBERS}
                        setState={handleUser}
                        state={selectedUser}
                        outline
                        nowrap
                    />
                }
            </View>


            <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                <ButtonStyled
                    onPress={() => closeModal()}
                    text='Cancel'
                    outline
                    width={48}
                />
                <ButtonStyled
                    onPress={() => addInCharge(selectedTeam, selectedUser)}
                    text='Assign'
                    width={48}
                />
            </View>

        </>
    )
}
