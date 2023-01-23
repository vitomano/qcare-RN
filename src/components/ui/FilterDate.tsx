// import React, { useState } from 'react'
// import DatePicker from 'react-native-date-picker'

// import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
// import { globalStyles } from '../../theme/globalStyles'
// import { inputColor } from '../../theme/variables'
// import { TextApp } from './TextApp'

// import { inputStyles } from '../../theme/inputStyles'
// import { dateFormat } from '../../helpers/dateFormat'



// interface Props {
//     label: string,
//     state: string,
//     setState: (item: string) => void
// }

// export const FilterDate = ({ label, state, setState }: Props) => {

//     const [open, setOpen] = useState(false)
//     const [date, setDate] = useState(new Date())

//     const handleSelect = (date: Date) => {
//         console.log(date)
//     };

//     return (
//         <View style={styles.container}>
//             <TextApp size='s' bold style={{ marginBottom: 5 }}>{label}</TextApp>

//             <View style={styles.inputDate}>
//                 <TouchableOpacity
//                     activeOpacity={.9}
//                     onPress={() => setOpen(true)}>
//                     <TextApp>{dateFormat(date) || '--'}</TextApp>
//                 </TouchableOpacity>
//             </View>

//             <DatePicker
//                 modal
//                 open={open}
//                 date={date}
//                 mode="date"
//                 onConfirm={(date) => {
//                     setOpen(false)
//                     setDate(date)
//                     handleSelect(date)
//                 }}
//                 onCancel={() => {
//                     setOpen(false)
//                 }}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         width:"48%"
//     },
//     inputDate: {
//         paddingHorizontal: 10,
//         paddingVertical: Platform.OS === 'android' ? 7 : 10,
//         borderRadius: 10,
//         backgroundColor: inputColor,
//     },

// });



//--------------------
import React, { useContext, useState } from 'react'
import DatePicker from 'react-native-date-picker'

import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { inputColor } from '../../theme/variables'
import { TextApp } from './TextApp'

import { dateFormat } from '../../helpers/dateFormat'
import { FilterContext } from '../../context/FilterContext'
import { QueryType } from '../../interfaces/interfaces';


interface Props {
    label: string,
    query: QueryType
    value: string | null
}

export const FilterDate = ({ label, value, query }: Props) => {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>(new Date())

    const { handleDate } = useContext( FilterContext )

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
                    handleDate(query, date)
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