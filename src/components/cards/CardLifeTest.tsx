import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';
import { inputColor, lightGrey, greenMain, check } from '../../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { useRemoveIntake } from '../../api/useIntakes';
import { alertMsg } from '../../helpers/alertMsg';
import { LifeTest } from '../../interfaces/interface.lifeTest';
import { StatusLife } from '../ui/StatusLife';
import { dateFormat } from '../../helpers/dateFormat';
import { CustomStatus } from '../ui/CustomStatus';

interface Props {
    lifeTest: LifeTest,
    id: string
}

export const CardLifeTest = ({ lifeTest, id }: Props) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('LifeTestScreen' as never, { id: lifeTest._id } as never)}
        >
            <View style={styles.item}>
            <View style={{ width: 80 }}>
              <TouchableWithoutFeedback>
                <CustomStatus lifetest={lifeTest!} id={id}/>
              </TouchableWithoutFeedback>
            </View>

                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <TextApp bold>{lifeTest.reportId?.mainData?.pallet_ref || "--"}</TextApp>
                    <View style={{ ...globalStyles.flexRow }}>

                        <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRadius: 5, marginRight: 5, backgroundColor: inputColor }}>
                            <TextApp size='xs'>{dateFormat(lifeTest.date) || "--"}</TextApp>
                        </View>
                        <TextApp size='xs'>{lifeTest.grower || lifeTest.reportId?.mainData?.grower || '--'}</TextApp>
                    </View>
                </View>

                <View style={{ ...globalStyles.flexRow, flexWrap: "wrap", width: 84 }}>
                    {
                        lifeTest.test.length === 0
                            ?
                            <View style={{ width: 12, height: 12, justifyContent: "center" }}>
                                <View style={[styles.days, styles.daysInactive]} />
                            </View>
                            :
                            lifeTest.test.map(test => (
                                <View key={ test._id } style={{ width: 12, height: 12, justifyContent: "center" }}>
                                    <View style={[styles.days, styles.daysActive]} />
                                </View>
                            ))
                    }
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: inputColor
    },
    days: {
        width: 8,
        height: 8,
        borderRadius: 100
    },
    daysInactive: { backgroundColor: lightGrey },
    daysActive: { backgroundColor: check }
});