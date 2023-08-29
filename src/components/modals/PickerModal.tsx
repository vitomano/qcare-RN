import React, { useEffect, useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { inputStyles } from '../../theme/inputStyles'
import { ActionColor } from '../ui/ActionColor'
import { GradeColor } from '../ui/GradeColor'
import { TextApp } from '../ui/TextApp'
import { PickerModalSelect } from './PickerModalSelect'
import { ScoreColor } from '../ui/ScoreColor';
import { globalStyles } from '../../theme/globalStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import { text } from '../../theme/variables'


export interface ListType {
    label: string
    value: string
}

interface Props<T> {
    LIST: T[]
    modal: boolean
    openModal: (b: boolean) => void
    setState: (val: string, opt?: any) => void
    state: string
    option?: any
    color?: boolean
    outline?: boolean
    nowrap?: boolean
}

export const PickerModal = <T extends ListType>({ LIST, openModal, modal, setState, state, option = undefined, color = false, outline=false, nowrap=false }: Props<T>) => {

    const [current, setCurrent] = useState<T>(LIST[0] as T)

    useEffect(() => {
        const finded = LIST.find(item => item.value === state)
        setCurrent(finded || LIST[0])
    }, [state, LIST])

    const Item = () => {
        if (option === "grade") { return <GradeColor grade={state as any} style={inputStyles.selectShape} /> }
        if (option === "action") { return <ActionColor action={state as any} style={inputStyles.selectShape} /> }
        if (option === "score") { return <ScoreColor score={state as any} style={inputStyles.selectShape} /> }
        else {
            return (
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => openModal(true)}
                    style={[inputStyles.select, inputStyles.selectShape]}
                >
                    <TextApp size='s'>{current.label}</TextApp>
                </TouchableOpacity>
            )
        }
    }

    return (

        <>
            <View style={{ flex: 1 }}>
                {
                    color
                        ?
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => openModal(true)}
                        >
                            <Item />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => openModal(true)}
                            style={
                                outline
                                ?[inputStyles.selectGrey, inputStyles.selectShape, globalStyles.flexBetween]
                                :[inputStyles.select, inputStyles.selectShape, globalStyles.flexBetween]
                            }
                        >
                            <TextApp size='normal' nowrap>{current.label}</TextApp>
                            <Icon name='chevron-down-outline' size={15} color={text}/>
                        </TouchableOpacity>
                }

            </View>

            <Modal
                transparent={true}
                animationType='fade'
                visible={modal}
                onRequestClose={() => openModal(false)}
            >

                <PickerModalSelect
                    LIST={LIST}
                    activeModal={openModal}
                    setState={setState}
                    setCurrent={setCurrent}
                    state={current.value}
                    option={option}
                    nowrap={nowrap}
                />

            </Modal>
        </>
    )
}
