import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { LoadingScreen } from '../../pages/LoadingScreen'


interface Props {
    modal: boolean
    text: string
}

export const ModalLoading = ({ modal, text="Loading..." }: Props) => {

    return (

        <>
            <Modal
                transparent={true}
                animationType='fade'
                visible={modal}
            >
                <View style={styles.container} >
                    <View style={{ ...styles.modal, height: "auto"}} >
                        <LoadingScreen text={text} />
                    </View>
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
        flex: 1,
        position: "relative"
    },
    modal: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        position: "absolute",
    },
});
