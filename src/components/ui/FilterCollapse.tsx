import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../theme/globalStyles'
import { blue } from '../../theme/variables'
import { FilterForm } from '../FilterForm'
import { FilterFormLifeTest } from '../FilterFormLifeTest'
import { TextApp } from './TextApp'

interface Props{
    lifeTestFilter?: boolean
}

export const FilterCollapse = ({lifeTestFilter=false}:Props) => {

    const [openFilter, setopenFilter] = useState(true)

    return (
        <>
            <View style={{ ...globalStyles.flexRow, marginBottom: 5, marginRight: 10, alignSelf: "flex-end" }}>
                <TextApp size='s' style={{ color: blue, marginRight: 5 }}>Filter</TextApp>
                <TouchableOpacity
                    activeOpacity={.9}
                    style={{ ...globalStyles.shadow }}
                    onPress={() => setopenFilter(!openFilter)}
                >
                    <View style={{ backgroundColor: "#fff", padding: 3, borderRadius: 5 }}>
                        <Icon name="options" size={20} color={blue} />
                    </View>
                </TouchableOpacity>
            </View>


            <Collapsible collapsed={openFilter} >
                {
                    lifeTestFilter
                    ?
                    <FilterFormLifeTest setopenFilter={setopenFilter}/>
                    :
                    <FilterForm setopenFilter={setopenFilter}/>
                }
            </Collapsible>
        </>
    )
}
