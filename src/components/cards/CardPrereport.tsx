import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Prereport } from '../../interfaces/intakes.reports';
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';
import Icon from 'react-native-vector-icons/Ionicons';
import { dateFormat } from '../../helpers/dateFormat';
import { inputColor } from '../../theme/variables';
import { ModalConfirmation } from '../modals/ModalConfirmation';
import { CardPrereportItem } from './CardPrereportItem';


interface Props {
    prereport: Prereport,
    refresh: boolean,
    setRefresh: (val: boolean) => void
}

export const CardPrereport = ({ prereport, refresh, setRefresh }: Props) => {

    const navigation = useNavigation()

    const [confirmation, setConfirmation] = useState(false)
    const existGrower = prereport.pallets.some(pall => pall.addGrower !== null)


    const handleRemove = async (id: string) => {
        console.log(id)

        // await qcareApi.delete(`/intakes/delete/${id}`);
        // setConfirmation(false)
        // setRefresh(!refresh)
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
            onPress={() => navigation.navigate('PreReportScreen' as never, { id: prereport._id } as never)}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ ...globalStyles.flexBetween }}>
                    <TextApp bold>{prereport.palletRef || "--"}</TextApp>
                    <View style={{ ...globalStyles.flexBetween }}>
                        <TextApp size='xs'>{dateFormat(prereport.endDate) || "--"}</TextApp>
                        {/* <TextApp size='xs'>{prereport.fruit || "--"}</TextApp> */}
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setConfirmation(true)}
                            style={{ marginLeft: 10 }}
                        >
                            <Icon size={20} name="ellipsis-vertical" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginTop: 10}}>
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


                <ModalConfirmation
                    openModal={setConfirmation}
                    modal={confirmation}
                    action={() => handleRemove(prereport._id)}
                    message='Are you sure you want to remove this intake?'
                />

            </View>
        </TouchableOpacity>
    )
}
