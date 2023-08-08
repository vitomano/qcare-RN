import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Prereport } from '../../interfaces/intakes.reports';
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';
import { dateFormat } from '../../helpers/dateFormat';
import { CardPrereportItem } from './CardPrereportItem';
import { CustomMenu } from '../ui/CustomMenu';

interface Props {
    prereport: Prereport
}

export const CardPrereport = ({ prereport }: Props) => {

    const navigation = useNavigation()

    const existGrower = prereport.pallets.some(pall => pall.addGrower !== null)

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
            onPress={() => navigation.navigate('PreReportScreen' as never, { id: prereport._id } as never)}
        >
            <View style={{ ...globalStyles.card, padding: 15, position: "relative" }}>
                <View style={{ ...globalStyles.flexBetween }}>
                    <TextApp bold>{prereport.palletRef || "--"}</TextApp>
                    <View style={{ ...globalStyles.flexBetween }}>
                        <TextApp size='xs' style={{ marginRight: 10 }}>{dateFormat(prereport.endDate) || "--"}</TextApp>

                        <TouchableWithoutFeedback>
                            <CustomMenu id={prereport._id}/>
                        </TouchableWithoutFeedback>

                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    {
                        existGrower
                            ?
                            prereport.pallets.map(pal => (
                                <CardPrereportItem
                                    key={pal.pid}
                                    mainData={prereport.mainData}
                                    grade={pal.grade}
                                    action={pal.action}
                                    addGrower={pal.addGrower}
                                />
                            ))

                            : <CardPrereportItem
                                grade={prereport.grade}
                                action={prereport.action}
                                mainData={prereport.mainData}
                            />
                    }
                </View>

            </View>
        </TouchableOpacity>

    )
}
