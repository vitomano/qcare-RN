import React, { Fragment, useRef, useState } from 'react'
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import { darkGrey, inputColor } from '../../theme/variables'
import { TextApp } from './TextApp'
import { PickerModal } from '../modals/PickerModal'
import { Tags } from './Tags'

interface ListType {
    label: string
    value: string
}

interface Props {
    label: string,
    state: string[],
    setState: (item: string[]) => void
    LIST: ListType[]
}

export const FilterSelect = ({ label, state, LIST, setState }: Props) => {

    const [openModal, setOpenModal] = useState(false)
    // const [currentVal, setCurrentVal] = useState("")

    const handleSelect = (val: string) => {
        if (state.includes(val)) return
        setState([...state, val])
    };

    return (
        <View style={[styles.container]}>
            <TextApp size='s' bold style={{ marginVertical: 8, width: 80, backgroundColor: "yellow" }}>{label}</TextApp>
           
            <View style={{flex: 1}}>
                <PickerModal
                    LIST={LIST}
                    modal={openModal}
                    openModal={setOpenModal}
                    state={label}
                    setState={handleSelect}
                    outline
                />

                <Tags
                    tags={state}
                    setTags={setState}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    grid: {
        // flex: 1
    },
    gridItem: {
        width: "32%",
        backgroundColor: inputColor,
        borderRadius: 5,
        paddingVertical: 8,
        marginBottom: 8
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10
    }
});