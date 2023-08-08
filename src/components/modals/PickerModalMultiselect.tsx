import React from 'react'
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../theme/globalStyles'
import { inputStyles } from '../../theme/inputStyles'
import { darkGrey, grey } from '../../theme/variables'
import ButtonStyled from '../ui/ButtonStyled'
import { TextApp } from '../ui/TextApp'

interface ListType {
    label: string
    value: string
}

interface Props<T> {
    LIST: T[]
    title: string
    modal: boolean
    openModal: (b: boolean) => void
    setState: (val: string[]) => void
    stateArray: string[]
    outline?: boolean
}

export const PickerModalMultiselect = <T extends ListType>({ LIST, title = "Select", openModal, modal, setState, stateArray, outline = false }: Props<T>) => {

    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height

    const onPressItem = (item: ListType) => {
        if (item.value === "0") return

        if (stateArray.includes(item.value)) {
            const finded = stateArray.filter(sel => sel !== item.value)
            setState(finded)
        } else setState([...stateArray, item.value])
    };

    return (

        <>
            <View style={{ flex: 1 }}>

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => openModal(true)}
                    style={
                        outline
                            ? [inputStyles.selectGrey, inputStyles.selectShape]
                            : [inputStyles.select, inputStyles.selectShape]
                    }
                >
                    <TextApp size='s'>{title}</TextApp>
                </TouchableOpacity>

            </View>

            <Modal
                transparent={true}
                animationType='fade'
                visible={modal}
                onRequestClose={() => openModal(false)}
            >

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => openModal(true)}
                    style={styles.container}
                >
                    <View
                        style={{ ...styles.modal, width: WIDTH - 40, height: "auto", maxHeight: HEIGHT - 100 }}
                    >

                        <View style={{ flex: 1 }}>
                            <ScrollView
                            persistentScrollbar={true}
                            style={{ paddingHorizontal: 10, paddingTop: 10, flex: 0.9 }}>
                                <View style={globalStyles.flexRow}>
                                    <View style={{ width: 30 }} />
                                    <TextApp bold style={styles.text}>{ title }</TextApp>
                                </View>
                                {
                                    LIST.map((item, i) => (
                                        <TouchableOpacity
                                            activeOpacity={.9}
                                            key={i}
                                            style={styles.option}
                                            onPress={() => onPressItem(item)}
                                        >
                                            <View style={[globalStyles.flexRow, stateArray.includes(item.value) && styles.selected]}>
                                                <View style={{ width: 30 }}>
                                                    {
                                                        stateArray.includes(item.value) &&
                                                        <Icon name="checkmark-sharp" size={18} style={{ color: darkGrey, alignSelf: 'center' }} />
                                                    }
                                                </View>
                                                <TextApp style={styles.text}>{item.label}</TextApp>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                <View style={{ marginBottom: 10, flex: 1 }} />
                            </ScrollView>

                            <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "center" }}>
                                <ButtonStyled
                                    onPress={() => openModal(false)}
                                    text='Accept'
                                    blue
                                    width={90}
                                    style={{ alignSelf: "center" }}
                                />
                            </View>
                        </View>

                    </View>

                </TouchableOpacity>

            </Modal>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    modal: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: "hidden"
    },
    option: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
        flex: 1
    },
    selected: {
        flex: 1,
        width: '100%',
        backgroundColor: grey,
        borderRadius: 10,
    }
});