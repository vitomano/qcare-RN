import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { inputStyles } from '../../theme/inputStyles'
import { PickerModalSelect } from './PickerModalSelect'


interface ListType {
    label: string
    value: string
}

interface Props<T> {
    LIST: T[]
    modal: boolean
    setModal: (b: boolean) => void,
    setState: (val: string) => void
    state: string
}

export const PickerModal = <T extends ListType>({ LIST, setModal, modal, setState, state }: Props<T>) => {

    const [current, setCurrent] = useState<T>(LIST[0] as T)

    useEffect(() => {
        const finded = LIST.find(item => item.value === state)
        setCurrent(finded || LIST[0])
    }, [state, LIST])


    return (

        <>
            <View style={{ width: "50%" }}>
                <TouchableOpacity
                    onPress={() => setModal(true)}
                    style={inputStyles.select}
                >
                    <Text>{current.label}</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                animationType='fade'
                visible={modal}
                onRequestClose={() => setModal(false)}
            >
                <PickerModalSelect
                    LIST={LIST}
                    activeModal={setModal}
                    setState={setState}
                    setCurrent={setCurrent}
                    state={current.value}
                />
            </Modal>


        </>
    )
}
