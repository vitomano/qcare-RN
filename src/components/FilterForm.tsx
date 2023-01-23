import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FilterContext } from '../context/FilterContext'
import { FRUITS, SCORE } from '../data/selects'
import { alertMsg } from '../helpers/alertMsg'
import { queryArray, queryString } from '../helpers/query'
import { globalStyles } from '../theme/globalStyles'
import { blue } from '../theme/variables'
import { CentredContent } from './CenterContent'
import ButtonStyled from './ui/ButtonStyled'
import { FilterDate } from './ui/FilterDate'
import { FilterInput } from './ui/FilterInput'
import { FilterSelect } from './ui/FilterSelect'
import { useQueryClient } from '@tanstack/react-query'


interface Props{
    setopenFilter: (b:boolean) => void
}

export const FilterForm = ({setopenFilter}:Props) => {

    const queryClient = useQueryClient()
    const navigation = useNavigation()

    const { palletRef, deliveryNote, supplier, fruit, score, startDate, endDate, cleanDates } = useContext(FilterContext)

    const filter = () => {
        queryClient.resetQueries((['filter']))

        let newQuery = ""
        newQuery += queryString("palletRef", palletRef)
            + queryString("deliveryNote", deliveryNote)
            + queryString("supplier", supplier)
            + queryArray("fruit", fruit)
            + queryArray("score", score)

        if (startDate !== null && endDate !== null) newQuery += `&startDate=${startDate}&endDate=${endDate}`

        if (newQuery.trim().length === 0) return alertMsg("Error", "No item selected")
        setopenFilter(true)
        navigation.navigate('FilterScreen' as never, { query: newQuery, page:1 } as never)
    };

    return (
        <View
            style={{ ...globalStyles.shadowCard, marginHorizontal: 5, marginBottom: 10 }}
        >
            <View style={{ ...globalStyles.card, padding: 15 }}>
                <FilterInput query="palletRef" value={palletRef} label="Pallet Ref:" />
                <FilterInput query="deliveryNote" value={deliveryNote} label="Delivery Note:" />
                <FilterInput query="supplier" value={supplier} label="Supplier:" />

                <FilterSelect query='fruit' LIST={FRUITS} label="Product:" value={fruit} />
                <FilterSelect query='score' LIST={SCORE} label="Score:" value={score} />

                <View style={{ flexDirection: "row", alignItems:"flex-end", marginVertical: 10 }}>
                    <View style={{ ...globalStyles.flexBetween, flex: 1 }}>
                        <FilterDate query="startDate" value={startDate} label="Start Date:" />
                        <FilterDate query="endDate" value={endDate} label="End Date:" />
                    </View>

                    <TouchableOpacity
                        activeOpacity={.9}
                        onPress={cleanDates}
                        style={{marginLeft: 7}}
                    >
                        <Icon name="close-circle" color={blue} size={30} />
                    </TouchableOpacity>
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
