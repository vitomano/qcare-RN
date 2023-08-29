import React from 'react'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { globalStyles } from '../theme/globalStyles'
import { greenMain } from '../theme/variables'
import { TextApp } from './ui/TextApp'

import { MainDataSelect } from '../helpers/objToArray'
import { jsonKeyToString } from '../helpers/jsonToString'
import { mainDataValue } from '../helpers/eliminarEs'

interface Props {
    mainData: MainDataSelect[],
    setMainData: (mainData: MainDataSelect[]) => void
}

export const StepTwo = ({ mainData, setMainData }: Props) => {

    const handleCheck = ( item:MainDataSelect ) => {

        const newMainData = mainData.map(info => {
            if (info.key === item.key) {
                return {
                    ...info,
                    check: !item.check
                }
            } else {
                return info
            }
        })
        setMainData(newMainData)
    }

    return (
        <View >
            <TextApp size='m' bold style={{ marginBottom: 25 }}>Select the data to display</TextApp>

            {
                mainData && mainData.length > 0 &&
                mainData.map(item => (
                    <View key={item.key} style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
                        <View style={{ flexDirection:'row', maxWidth: '50%', width: '50%' }}>

                            <BouncyCheckbox
                                isChecked={item.check}
                                size={15}
                                fillColor={greenMain}
                                unfillColor="#FFFFFF"
                                iconStyle={{ marginRight: -8 }}
                                onPress={() => handleCheck( item )}
                            />
                            <TextApp numberOfLines={2} style={{flex: 1}}>{jsonKeyToString(item.key)}</TextApp>
                        </View>

                        <TextApp bold numberOfLines={2} style={{width: '50%'}}>{mainDataValue(item.key, item.value)}</TextApp>
                    </View>
                ))
            }

        </View>
    )
}

