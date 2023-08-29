import React, { useContext, useState } from 'react'
import { ScrollView, Switch, View } from 'react-native'
import { CentredContent } from '../components/CenterContent'
import ButtonStyled from '../components/ui/ButtonStyled'
import Toast from 'react-native-toast-message'

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Papa from 'papaparse'

import DocumentPicker, { types } from 'react-native-document-picker'
import { IntakeCSV, ObjectType } from '../interfaces/intakes.reports';
import { IntakeList } from '../components/IntakeList';
import qcareApi from '../api/qcareApi';
import { StackScreenProps } from '@react-navigation/stack'
import { IntakesStackParams } from '../navigation/IntakesStack'
import { useQueryClient } from '@tanstack/react-query'
import { LoadingScreen } from './LoadingScreen'
import { TextApp } from '../components/ui/TextApp'
import { AuthContext } from '../context/AuthContext'
import { objectToJson } from '../helpers/objToArray'
import { globalStyles } from '../theme/globalStyles'
import { ModalContainer } from '../components/modals/ModalContainer'
import { AssignTeam } from '../components/AssignTeam'

interface Props extends StackScreenProps<IntakesStackParams, "IntakeUploadScreen"> { };

export const IntakeUploadScreen = ({ navigation }: Props) => {

    const { user } = useContext(AuthContext)

    const [intakes, setIntakes] = useState<IntakeCSV[]>([])
    const [assign, setAssign] = useState<boolean>(false)
    const [modalTeam, setModalTeam] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    const docPicker = async () => {
        DocumentPicker.pickSingle({
            type: [types.allFiles],
        })
            .then(async (resp) => {

                // "type": "text/comma-separated-values"
                // "type": "text/csv"

                fetch(resp.uri)
                    .then(async (response) => {

                        const resp = await response.text();

                        Papa.parse(resp, {
                            header: true,
                            encoding: 'UTF-8',
                            transformHeader: (headerName) => headerName.toLowerCase(),
                            complete: function (results: any) {

                                let csvFile: IntakeCSV[] = []
                                let asignOneTeam = user?.teams.length === 1

                                let data: ObjectType[] = results.data

                                for (let item of data) {

                                    const { pallet, pallet_ref, pallet_reference, kilos, total_kilos, ...rest } = objectToJson(item)

                                    csvFile.push({
                                        id: uuidv4(),
                                        data: {
                                            pallet_ref: pallet || pallet_ref || pallet_reference || "",
                                            ...rest,
                                            kilos: kilos || total_kilos || "",
                                        },
                                        inCharge: null,
                                        team: asignOneTeam ? user?.teams[0]._id! : null
                                    })
                                }

                                setIntakes(csvFile)
                                setAssign(asignOneTeam)

                            }
                        });

                    })
                    .catch((error) => {
                        console.error("some error occurred", error);
                    });

            }
            )
            .catch(err => console.log(err))
    }

    const handleSubmit = async () => {

        setIsLoading(true)

        try {
            await qcareApi.post('/intakes/new', intakes)
            Toast.show({
                type: 'success',
                text1: 'Intakes uploaded successfully'
            });
            queryClient.invalidateQueries(['intakes'])
            navigation.navigate("IntakesScreen" as never)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong'
            });
        } finally {
            setIsLoading(false)
        }
    }

    //----------------- Managing teams -----------------

    const handleToggle = () => {
        if (assign) {
            setIntakes(intakes.map(intake => ({ ...intake, team: null })))
            setAssign(false)
        } else {
            if (user?.teams.length === 1) {
                setIntakes(intakes.map(intake => ({ ...intake, team: user.teams[0]._id })))
                setAssign(true)
            } else {
                setModalTeam(true)
            }
            setAssign(!assign)
        }
    };

    const assignToAll = (team: string) => {
        if( team === "0" ) return setModalTeam(false)
        setIntakes(intakes.map(intake => ({ ...intake, team, inCharge: null })))
        setAssign(true)
        setModalTeam(false)
    };

    //----------------- END Managing teams -----------------

    if (isLoading) {
        return <LoadingScreen text='Uploading Intakes...' />
    }

    return (
        <ScrollView>

            <View>
                <CentredContent style={{ marginTop: 30, marginBottom: 30 }}>
                    <ButtonStyled
                        text='Select CSV File'
                        width={60}
                        icon='document-text-outline'
                        onPress={docPicker}
                    />
                </CentredContent>
            </View>


            {
                user &&
                user.teams.length > 0 && intakes.length > 0 &&

                <>
                    <ModalContainer
                        modal={modalTeam}
                        openModal={setModalTeam}
                    >
                        <AssignTeam
                            closeModal={() => setModalTeam(false)}
                            assignToAll={assignToAll}
                            setAssign={setAssign}
                        />
                    </ModalContainer>

                    <View style={{ ...globalStyles.flexRow, paddingHorizontal: 20, marginBottom: 20 }}>
                        <Switch
                            onValueChange={handleToggle}
                            value={assign}
                        />
                        <TextApp style={{ marginLeft: 10 }}>Assign {`${user.teams.length === 1 ? user.teams[0].name : "Team"}`} to all</TextApp>
                    </View>
                </>
            }


            {
                intakes.length > 0 && user

                    ?
                    <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
                        {
                            intakes.map((intake, index) => (
                                <IntakeList
                                    key={uuidv4()}
                                    intake={intake}
                                    setIntakes={setIntakes}
                                    index={index}
                                    hasTeams={user.teams.length > 0}
                                />

                            ))
                        }

                        <CentredContent style={{ marginTop: 10, marginBottom: 20 }}>
                            <ButtonStyled
                                text='Upload Intakes'
                                width={70}
                                icon='document-text-outline'
                                onPress={handleSubmit}
                            />
                        </CentredContent>

                    </View>

                    :
                    <View style={{ paddingHorizontal: 50 }}>
                        <TextApp center size='xs' color='mute'>We recommend to upload the CSV file in the web version www.q-care.info</TextApp>
                    </View>
            }

        </ScrollView>
    )
}
