import React, { useContext } from 'react'
import { View } from 'react-native';
import { IntakeContext } from '../context/IntakeContext';
import { MainData } from '../interfaces/intakes.reports'
import { CustomInput } from './CustomInput';
import { CreateContext } from '../context/CreateContext';
import { jsonKeyToString } from '../helpers/jsonToString';

type Props = {
    mainData: MainData
    createNew?: boolean
}

export const MainForm = ({ mainData, createNew = false }: Props) => {

    const { totalPallets, handleMain } = useContext(IntakeContext)
    const { totalPallets: totalPalletsNew, handleMain: handleMainNew } = useContext(CreateContext)

    const handleMainData = createNew ? handleMainNew : handleMain

    return (
        <View>
            {
                Object.entries(mainData).map(([key, value]) => (
                    <CustomInput
                        key={key}
                        label={jsonKeyToString(key)}
                        value={value}
                        item={key}
                        handleInput={handleMainData}
                    />
                ))
            }
        </View>
    )
}
