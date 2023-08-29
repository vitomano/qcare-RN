import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../theme/globalStyles'
import { TextApp } from './ui/TextApp'
import { inputStyles } from '../theme/inputStyles'
import DatePicker from 'react-native-date-picker'
import dayjs from 'dayjs'

interface Props {
    label: string,
    date: Date,
    setDate:(date:Date)=>void
    open: boolean,
    setOpen: (open: boolean) => void
}

export const DateSelector = ({ label, open, setOpen, date, setDate }:Props) => {
    return (
        <View style={{ ...globalStyles.flexRow, marginBottom: 10 }}>
            <TextApp style={{ width: "50%" }}>{label}</TextApp>

            <View style={[inputStyles.select, inputStyles.selectShape, { flex: 1 }]}>
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => setOpen(true)}>
                    <TextApp size='s'>{dayjs(date).format('DD-MM-YYYY') || '--'}</TextApp>
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
                }}
                onCancel={() => { setOpen(false) }}
            />
        </View>
    )
}
