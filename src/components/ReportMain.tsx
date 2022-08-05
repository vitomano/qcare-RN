import React from 'react'
import { Text, View } from 'react-native'
import { tituloEs } from '../helpers/eliminarEs'
import objToArray from '../helpers/objToArray'
// import { tituloEs } from '../../../helpers/eliminarEs'
// import objToArray from '../../../helpers/objToArray'
import { MainInfo } from '../interfaces/intakes.reports'


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
                        <View>
                            {
                                item[0] === 'gln_ggn'
                                    ? <Text>GLN/GGN</Text>
                                    : <Text>{tituloEs(item[0])}</Text>
                            }
                        </View>

                        <Text style={{width: '45%', fontWeight: 'bold'}}>{item[1]}</Text>
                    </View>
                ))

            }
        </>
    )
}
