import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native';
import { colorScore } from '../../helpers/colorScore';
import { SingleReport } from '../../interfaces/intakes.reports';
import { globalStyles } from '../../theme/globalStyles';
import { TextApp } from '../ui/TextApp';


interface Props {
    report: SingleReport,
}

export const CardReport = ({ report }: Props) => {

    const navigation = useNavigation()
    const coverImg = report.pallets.find(cover => cover.images.length > 0)

    return (


        <TouchableOpacity
            style={{
                marginHorizontal: 5,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,

                elevation: 5,
            }}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('ReportScreen' as never, { id: report._id } as never)}
        >
            <View style={{ ...globalStyles.card, ...globalStyles.flexRow }}>
                <Image
                    source={
                        coverImg === undefined
                            ? require('../../assets/no-image.jpg')
                            : { uri: coverImg.images[0].imgURL_low || coverImg?.images[0].imgURL }
                    }
                    style={{ width: 100, minHeight: 80, height: "100%", resizeMode: 'cover' }}
                />
                <View style={{ padding: 10 }}>
                    <TextApp bold>{report.palletRef || "--"}</TextApp>
                    <TextApp size='xs'>{report.mainData.supplier || "--"}</TextApp>
                    <TextApp size='xs'>{report.mainData.total_pallets || "--"}</TextApp>
                    <TextApp size='xs'>{new Date(report.date).toLocaleDateString() || "--"}</TextApp>
                </View>

                <View style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    borderRadius: 5,
                }}>
                    {colorScore((report.score||0).toString())}
                </View>
            </View>
        </TouchableOpacity>
    )
}
