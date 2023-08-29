import React, { useContext, useEffect, useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { ListType, PickerModal } from './modals/PickerModal';
import { AuthContext } from '../context/AuthContext';

interface Props {
    allTitle: string;
    team: string | undefined;
    setPage: (page: number) => void;
    setTeam: (team: string | undefined) => void;
    style?: StyleProp<ViewStyle>

}

export const TeamSelector = ({ allTitle = "All", team, setPage, setTeam, style }: Props) => {

    const { user } = useContext(AuthContext)

    const [modalTeam, setModalTeam] = useState<boolean>(false)
    const [TEAMS, setTEAMS] = useState<ListType[]>([])


    useEffect(() => {
        const teams = user?.teams.map(team => ({ value: team._id, label: team.name })) ?? []
        setTEAMS([{ value: allTitle, label: allTitle }, ...teams])
    }, [user])


    const handleTeam = (team: string) => {
        setTeam(team === allTitle ? undefined : team)
        setPage(1)
    };

    return (
        <>
            {user && user.teams.length > 0 &&
                user.teams.length > 0 && TEAMS.length > 0 &&
                <View style={style}>
                    <PickerModal
                        modal={modalTeam}
                        openModal={setModalTeam}
                        setState={handleTeam}
                        state={ (team ?? TEAMS[0].label ) }
                        LIST={TEAMS}
                        outline
                        nowrap
                    />
                </View>
            }
        </>
    )
}
