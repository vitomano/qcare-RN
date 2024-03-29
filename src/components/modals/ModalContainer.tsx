import React from 'react'
import { Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'


interface Props {
    modal: boolean
    openModal: (b: boolean) => void
    children: JSX.Element | JSX.Element[]
}

export const ModalContainer = ({ openModal, modal, children }: Props) => {

    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height

    return (

        <>
            <Modal
                transparent={true}
                animationType='fade'
                visible={modal}
                onRequestClose={() => openModal(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => openModal(false)}
                        style={styles.container}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => openModal(true)}
                            style={{ ...styles.modal, width: WIDTH - 40, height: "auto", maxHeight: HEIGHT - 80 }} >
                            <ScrollView style={{ padding: 20 }}>
                                {children}
                            </ScrollView>
                        </TouchableOpacity>

                    </TouchableOpacity>
                </KeyboardAvoidingView>

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
        // padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start',
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
    },
});
