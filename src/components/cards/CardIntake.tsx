import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Intake } from '../../interfaces/intakes.reports'
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';
import { inputColor, text } from '../../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { useRemoveIntake } from '../../api/useIntakes';
import { Badge } from '../ui/Badge';


interface Props {
    intake: Intake,
}

export const CardIntake = ({ intake }: Props) => {

    const navigation = useNavigation()

    const [confirmation, setConfirmation] = useState(false)

    const { mutateAsync, isLoading } = useRemoveIntake()

    const handleRemove = async (id: string) => {
        await mutateAsync(id)
        setConfirmation(false)
    }

    return (
        <TouchableOpacity
            style={{
                marginHorizontal: 5,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,

                elevation: 5,
            }}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('IntakeScreen' as never, { id: intake._id } as never)}
        >
            <View style={{ ...globalStyles.card, ...globalStyles.flexRow, position: "relative", paddingLeft: 15, paddingVertical: 15 }}>

                {
                    intake.team &&
                    <View style={{ position: "absolute", top: 12, left: 15, ...globalStyles.flexRow }}>
                        <Icon name="people-outline" size={17} />
                        {
                            intake.inCharge &&
                            <Badge>
                                {intake.inCharge.name + " " + (intake.inCharge.lastname.charAt(0) + ".")}
                            </Badge>
                        }
                    </View>
                }

                <View style={{ width: "40%", marginRight: 5 }}>
                    <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 15, marginBottom: 2, color: text }}>{intake.data?.pallet_ref || "--"}</Text>
                    <TextApp size='xs' nowrap>{intake.data.product || "--"}</TextApp>
                </View>

                <View style={{
                    borderLeftWidth: 1,
                    borderLeftColor: inputColor,
                    paddingLeft: 10,
                    marginRight: 30,
                    paddingVertical: 10,
                    flex: 1
                }}>
                    <TextApp size='xs' nowrap>{intake.data.supplier || "--"}</TextApp>
                    <TextApp size='xs' nowrap>{intake.data.format || "--"}</TextApp>
                    <TextApp size='xs' nowrap>{intake.data.total_pallets || "--"}</TextApp>
                    <TextApp size='xs' nowrap>{intake.data.total_boxes || "--"}</TextApp>
                    <TextApp size='xs' nowrap>{intake.data.transport || "--"}</TextApp>
                </View>

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => setConfirmation(true)}
                    style={{ position: "absolute", top: 10, right: 10 }}
                >
                    <Icon size={22} name="close-circle" />
                </TouchableOpacity>

                <ModalConfirmation
                    openModal={setConfirmation}
                    modal={confirmation}
                    action={() => handleRemove(intake._id)}
                    message='Are you sure you want to remove this intake?'
                    loading={isLoading}
                    confirmText="Remove"
                />
            </View>
        </TouchableOpacity>
    )
}
