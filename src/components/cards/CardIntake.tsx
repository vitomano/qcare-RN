import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Intake } from '../../interfaces/intakes.reports'
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';
import { inputColor } from '../../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { useRemoveIntake } from '../../api/useIntakes';

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
            <View style={{ ...globalStyles.card, ...globalStyles.flexRow, position: "relative", padding: 15 }}>
                <View style={{ width: "35%" }}>
                    <TextApp bold>{intake.data.pallet_ref || "--"}</TextApp>
                    <TextApp size='xs'>{intake.data.product || "--"}</TextApp>
                </View>

                <View style={{ borderLeftWidth: 1, borderLeftColor: inputColor, paddingLeft: 15 }}>
                    <TextApp size='xs'>{intake.data.supplier || "--"}</TextApp>
                    <TextApp size='xs'>{intake.data.format || "--"}</TextApp>
                    <TextApp size='xs'>{intake.data.total_pallets || "--"}</TextApp>
                    <TextApp size='xs'>{intake.data.total_boxes || "--"}</TextApp>
                    <TextApp size='xs'>{intake.data.transport || "--"}</TextApp>
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
