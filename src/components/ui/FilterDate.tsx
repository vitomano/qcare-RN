
import React, { useContext, useState } from 'react'
import DatePicker from 'react-native-date-picker'

import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { inputColor } from '../../theme/variables'
import { TextApp } from './TextApp'

import { dateFormat } from '../../helpers/dateFormat'
import { FilterContext } from '../../context/FilterContext'
import { QueryType } from '../../interfaces/interfaces';
import { FilterLifeContext } from '../../context/FilterLifeContext';


interface Props {
    label: string,
    query: QueryType
    value: string | null
    lifetest?: boolean
}

export const FilterDate = ({ label, value, query, lifetest=false }: Props) => {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>(new Date())

    const { handleDate } = useContext( FilterContext )
    const { handleDate: handleLifeDate } = useContext( FilterLifeContext )

    return (
        <View style={styles.container}>
            <TextApp size='s' bold style={{ marginBottom: 5 }}>{label}</TextApp>

            <View style={ styles.inputDate }>
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => setOpen(true)}>
                    <TextApp>{value === null ? '--' : dateFormat(date)}</TextApp>
                </TouchableOpacity>
            </View>

            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    lifetest
                    ? handleLifeDate(query, date)
                    : handleDate(query, date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"48%"
    },
    inputDate: {
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 7,
        borderRadius: 10,
        backgroundColor: inputColor,
    },

});