import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Intake } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles';

interface Props {
    intake: Intake,
}

export const CardIntake = ({ intake }: Props) => {

    const navigation = useNavigation()

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
            <View style={{ ...globalStyles.card, ...globalStyles.flexRow, padding: 15 }}>
                <View style={{ width: "35%" }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{intake.data.pallet_ref || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{intake.data.product || "--"}</Text>
                </View>
                
                <View style={{ borderLeftWidth: .5, borderLeftColor: "#d9d9d9", paddingLeft: 15 }}>
                    <Text style={{ fontSize: 12 }}>{intake.data.supplier || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{intake.data.format || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{intake.data.total_pallets || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{intake.data.total_boxes || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{intake.data.transport || "--"}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}
