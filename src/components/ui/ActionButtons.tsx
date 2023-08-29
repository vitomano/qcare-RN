import React from 'react'
import { View } from 'react-native'
import ButtonStyled from './ButtonStyled'
import { globalStyles } from '../../theme/globalStyles'

interface Props {
    closeModal: () => void,
    action: () => void,
    okText?: string,
    cancelText?: string,
    isLoading?: boolean
}

export const ActionButtons = ({closeModal, action, cancelText="Cancel", okText="Ok", isLoading}:Props) => {
    return (
        <View style={{flex:1, width: '100%'}}>
            <View style={{ ...globalStyles.flexBetween }}>
                <ButtonStyled
                    onPress={() => closeModal()}
                    text={cancelText}
                    outline
                    blue
                    width={48}
                />
                <ButtonStyled
                    loading={isLoading}
                    onPress={() => action()}
                    text={okText}
                    blue
                    width={48}
                />
            </View>
        </View>
    )
}
