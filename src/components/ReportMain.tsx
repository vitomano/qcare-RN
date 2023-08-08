import React from 'react'
import { View } from 'react-native'
import { mainDataValue, tituloEs } from '../helpers/eliminarEs'
import objToArray from '../helpers/objToArray'
import { MainInfo } from '../interfaces/intakes.reports'
import { TextApp } from './ui/TextApp'


interface Props{
    mainData: MainInfo,
}

export const ReportMain = ({ mainData }:Props) => {

    const mainDatos = objToArray(mainData)

    return (
        <>
            {
                mainDatos.map((item, i) => (
                    <View key={i}
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}
                    >
                        <View style={{marginBottom: 5}}>
                            {
                                item[0] === 'gln_ggn'
                                    ? <TextApp>GLN/GGN</TextApp>
                                    : <TextApp>{tituloEs(item[0]) || "--"}</TextApp>
                            }
                        </View>

                        <TextApp bold style={{width: '45%'}}>{ mainDataValue(item[0], item[1]) || "--"}</TextApp>
                    </View>
                ))

            }
        </>
    )
}
