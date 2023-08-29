import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IntakeCSV } from '../interfaces/intakes.reports';
import { globalStyles } from '../theme/globalStyles'
import { inputColor, red, redBg2 } from '../theme/variables'
import { PalletNum } from './ui/PalletNum'
import { TextApp } from './ui/TextApp'
import { jsonKeyToString } from '../helpers/jsonToString'
import { v4 as uuidv4 } from 'uuid';
import { CentredContent } from './CenterContent'
import ButtonStyled from './ui/ButtonStyled'
import { ModalConfirmation } from './modals/ModalConfirmation';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalContainer } from './modals/ModalContainer';
import { InChargeSelector } from './InChargeSelector';

interface Props {
    intake: IntakeCSV,
    setIntakes: React.Dispatch<React.SetStateAction<IntakeCSV[] | []>>,
    index: number,
    hasTeams: boolean
}

export const IntakeList = ({ intake, setIntakes, index, hasTeams }: Props) => {

    const { user } = useContext(AuthContext)

    const [modalInCharge, setModalInCharge] = useState<boolean>(false)
    const [modalConfirmation, setModalConfirmation] = useState<boolean>(false)

    const members = user ? [...user.teamsAdmin, ...user.teamsUser].map(team => team.members).flat() : []

    const addInCharge = (team:string , member:string) => {
        setIntakes( intakes => intakes.map(item => {
            if (item.id === intake.id) {
                return {
                    ...item,
                    team: team.toString() === "0" ? null : team,
                    inCharge: member.toString() === "0" ? null : member
                }
            }
            else return item
        }) )
        setModalInCharge(false)
    };

    const cleanInCharge = (cardId: string) => {
        setIntakes(intakes => intakes.map(intake => {
            if (intake.id === cardId) {
                return {
                    ...intake,
                    team: null,
                    inCharge: null
                }
            }
            else return intake
        }))
    };

    const deleteIntake = (intakeId: string) => {
        setIntakes(prev => prev.filter(intake => intake.id !== intakeId))
    };

    return (
        <View style={globalStyles.shadowCard} >
            <View style={styles.container}>

                <View style={{ ...globalStyles.flexBetween, marginBottom: 20, marginTop: 10 }}>

                    <PalletNum num={index + 1} title='Intake' />

                    <ModalConfirmation
                        title='Delete intake'
                        message='Are you sure you want to delete this intake?'
                        action={() => deleteIntake(intake.id)}
                        modal={modalConfirmation}
                        openModal={setModalConfirmation}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setModalConfirmation(true)}
                        style={{ backgroundColor: redBg2, paddingHorizontal: 15, paddingVertical: 4, borderRadius: 50 }}
                    >
                        <TextApp size='s' style={{ color: red }}>remove</TextApp>
                    </TouchableOpacity>

                </View>

                {
                    Object.entries(intake.data).map(item => (
                        <View style={styles.intake} key={uuidv4()}>
                            <TextApp style={styles.label}>{jsonKeyToString(item[0])}</TextApp>
                            <View style={styles.valueContainer}><TextApp style={styles.value}>{item[1]}</TextApp></View>
                        </View>
                    ))
                }


                <ModalContainer
                    modal={modalInCharge}
                    openModal={setModalInCharge}
                >
                    <InChargeSelector
                        closeModal={() => setModalInCharge(false)}
                        addInCharge={addInCharge}
                        intake={intake}
                    />
                </ModalContainer>


                {
                    hasTeams && !intake.team
                        ?
                        <CentredContent style={{ marginVertical: 20 }}>
                            <ButtonStyled
                                text='Assign to a team'
                                width={60}
                                blue
                                icon='person-add-outline'
                                onPress={() => setModalInCharge(true)}
                                iconSize={20}
                            />
                        </CentredContent>

                        :
                        intake.team && user &&

                        <CentredContent style={{ marginVertical: 20 }}>
                            <ButtonStyled
                                text={user.teams.find(team => team._id === intake.team)?.name ?? ""}
                                width={90}
                                blue
                                onPress={() => setModalInCharge(true)}
                                style={{ marginBottom: 10, overflow: "hidden" }}
                                styleText={{paddingHorizontal: 15}}
                                numberOfLines={1}
                            />

                            {
                                intake.inCharge &&
                                <ButtonStyled
                                    text={members?.find(member => member.uid === intake.inCharge)?.email ?? ""}
                                    width={90}
                                    blue
                                    outline
                                    onPress={() => setModalInCharge(true)}
                                    style={{ marginBottom: 10 }}
                                    styleText={{paddingHorizontal: 15}}
                                    numberOfLines={1}
                                />
                            }

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ alignItems: "center", justifyContent: "center", backgroundColor: 'black', height: 25, width: 25, borderRadius: 50, marginTop: 10 }}
                                onPress={() => cleanInCharge(intake.id)}
                            >
                                <Icon name='close' size={20} color="white" />
                            </TouchableOpacity>

                        </CentredContent>


                }

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 25,
    },
    intake: {
        flexDirection: "row",
        marginBottom: 8
    },
    label: {
        flex: 1,
        paddingRight: 5,
        fontSize: 15
    },
    valueContainer: {
        flex: 1,
        backgroundColor: inputColor,
        paddingVertical: 8,
        paddingHorizontal: 7,
        borderRadius: 8
    },
    value: {
        fontSize: 15
    }
});