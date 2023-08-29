import React from 'react'
import { View } from 'react-native'
import { mainDataValue, tituloEs } from '../helpers/eliminarEs'
import objToArray from '../helpers/objToArray'
import { MainData } from '../interfaces/intakes.reports'
import { TextApp } from './ui/TextApp'
import { jsonKeyToString } from '../helpers/jsonToString'


interface Props{
    mainData: MainData,
}

export const ReportMain = ({ mainData }:Props) => {

    const mainDatos = objToArray(mainData)

    return (
        <>
            {
                mainDatos.map((item, i) => (
                    <View key={i}
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                    >
                        <View style={{ flex: 1, marginRight: 10 }}>
                            {
                                item[0] === 'gln_ggn'
                                    ? <TextApp>GLN/GGN</TextApp>
                                    : <TextApp>{ jsonKeyToString(item[0]) || "--"}</TextApp>
                            }
                        </View>

                        <TextApp bold style={{width: '45%'}}>{ mainDataValue(item[0], item[1]) || "--"}</TextApp>
                    </View>
                ))

            }
        </>
    )
}
