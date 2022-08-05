import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { colorScore } from '../helpers/colorScore';
import { SingleReport } from '../interfaces/intakes.reports'

interface Props {
    report: SingleReport,
}

export const CardReport = ({ report }: Props) => {

    const navigation = useNavigation()
    const coverImg = report.pallets.find(cover => cover.images.length > 0)

    return (


        <TouchableOpacity
            style={{
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
            <View style={{ ...styles.card }}>
                <Image
                    source={
                        coverImg === undefined
                            ? require('../assets/no-image.jpg')
                            : { uri: coverImg.images[0].imgURL_low || coverImg?.images[0].imgURL }
                    }
                    style={{ width: 100, minHeight: 80, height: "100%", resizeMode: 'cover' }}
                />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{report.palletRef || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{report.mainData.supplier || "--"}</Text>
                    <Text style={{ fontSize: 12 }}>{report.mainData.total_pallets || "--"}</Text>
                    <Text style={{ fontSize: 10 }}>{new Date(report.date).toLocaleDateString() || "--"}</Text>
                </View>
                <View style={{
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                    backgroundColor: 'red'
                }}>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 10,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 1,

        elevation: 6,
    },
});