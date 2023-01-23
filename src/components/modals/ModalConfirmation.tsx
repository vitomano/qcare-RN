import React from 'react'
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import { grey } from '../../theme/variables'
import ButtonStyled from '../ui/ButtonStyled'
import { TextH2 } from '../ui/TextH2'
import { TextApp } from '../ui/TextApp';
import { LoadingScreen } from '../../pages/LoadingScreen'

interface Props {
    modal: boolean
    openModal: (b: boolean) => void
    title?: string
    message: string
    action: () => void
    loading?: boolean
}

export const ModalConfirmation = ({  openModal, modal,title="Confirmation", message, action, loading = false }: Props) => {

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
                <TouchableOpacity
                    onPress={() => openModal(false)}
                    style={styles.container}
                >
                    {
                        loading
                            ?
                            <View style={{ ...styles.modal, height: "auto", position: "absolute" }} >
                                <LoadingScreen text='Removing Intake' />
                            </View>
                            :
                            <View style={{ ...styles.modal, width: WIDTH - 40, height: "auto", maxHeight: HEIGHT - 80 }} >
                                <ScrollView>
                                    <TextH2 style={{ marginBottom: 10, textAlign:"center" }}>{title}</TextH2>
                                    <TextApp center>{message}</TextApp>
                                    <View style={{ ...globalStyles.flexBetween, marginTop: 30 }}>
                                        <ButtonStyled
                                            onPress={() => openModal(false)}
                                            text='Cancel'
                                            outline
                                            blue
                                            width={48}
                                        />
                                        <ButtonStyled
                                            onPress={action}
                                            text='Confirm'
                                            danger
                                            // outline
                                            width={48}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                    }

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
        backgroundColor: 'rgba(0,0,0,.5)',
        position: "relative"
    },
    modal: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start',
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
        // fontWeight: 'bold'
    },
    selected: {
        flex: 1,
        width: '100%',
        backgroundColor: grey,
        borderRadius: 10,
        // paddingLeft: 5,
        // borderColor: greenMain,
        // borderWidth: .5
    }
});
