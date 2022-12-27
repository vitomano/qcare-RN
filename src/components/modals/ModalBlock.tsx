import React from 'react'
import { Dimensions, Modal, ScrollView, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';


interface Props {
    modal: boolean
    openModal: (b: boolean) => void
    children: JSX.Element | JSX.Element[]
    style?: StyleProp<ViewStyle>
}

export const ModalBlock = ({ openModal, modal, children, style }: Props) => {

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
                <View style={styles.container} >
                    <ScrollView style={{ ...styles.modal, width: WIDTH - 40, height: "auto", maxHeight: HEIGHT - 80, ...style as any }} >
                        {children}
                    </ScrollView>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
        padding: 20,
        flex: 1,
        position: "relative"
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        position: "absolute",
    },
    option: {
        alignItems: 'flex-start',
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
    },
});
