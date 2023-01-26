import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { STATUS } from '../data/selects'
import { alertMsg } from '../helpers/alertMsg'
import {  queryString } from '../helpers/query'
import { globalStyles } from '../theme/globalStyles'
import { blue } from '../theme/variables'
import { CentredContent } from './CenterContent'
import ButtonStyled from './ui/ButtonStyled'
import { FilterDate } from './ui/FilterDate'
import { FilterInput } from './ui/FilterInput'
import { useQueryClient } from '@tanstack/react-query'
import { FilterLifeContext } from '../context/FilterLifeContext';
import { TextApp } from './ui/TextApp'


interface Props{
    setopenFilter: (b:boolean) => void
}

export const FilterFormLifeTest = ({setopenFilter}:Props) => {

    const queryClient = useQueryClient()
    const navigation = useNavigation()

    const { palletRef, grower, status, startDate, endDate, handleStatus, cleanDates } = useContext(FilterLifeContext)

    const filter = () => {
        queryClient.resetQueries((['filterLife']))

        let newQuery = ""
        newQuery += queryString("palletRef", palletRef)
            + queryString("grower", grower)
            + queryString("status", status)


        if (startDate !== null && endDate !== null) newQuery += `&startDate=${startDate}&endDate=${endDate}`

        if (newQuery.trim().length === 0) return alertMsg("Error", "No item selected")
        setopenFilter(true)
        navigation.navigate('FilterLifeScreen' as never, { query: newQuery, page: 1 } as never)
    };

    return (
        <View
            style={{ ...globalStyles.shadowCard, marginHorizontal: 5, marginBottom: 10 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems:"flex-end", marginBottom: 25 }}>
                    <View style={{ ...globalStyles.flexBetween, flex: 1 }}>
                        <FilterDate query="startDate" value={startDate} label="Start Date:" lifetest/>
                        <FilterDate query="endDate" value={endDate} label="End Date:" lifetest/>
                    </View>

                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={cleanDates}
                        style={{marginLeft: 7}}
                    >
                        <Icon name="close-circle" color={blue} size={30} />
                    </TouchableOpacity>
                </View>

                <FilterInput query="palletRef" value={palletRef} label="Pallet Ref:" lifetest/>
                <FilterInput query="grower" value={grower} label="Grower:" lifetest/>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, marginBottom: 10 }}>
                    {
                        STATUS.map(stat => (
                            <TouchableOpacity
                                onPress={() => handleStatus(stat.value)}
                                activeOpacity={.9}
                                style={{
                                    width: "32%", backgroundColor: stat.fill, paddingVertical: 8, borderRadius: 10,
                                    borderColor: status === stat.value ? stat.color : stat.fill,
                                    borderWidth: 1
                                }}
                                key={stat.value}
                            >
                                <TextApp center size='s' style={{ color: stat.color }}>{stat.label}</TextApp>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <CentredContent style={{ marginTop: 15 }}>
                    <ButtonStyled
                        text='Filter'
                        blue
                        onPress={filter}
                        width={50}
                    />
                </CentredContent>
            </View>

        </View>
    )
}
