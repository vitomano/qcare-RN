import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons';

import React, { useContext, useState } from 'react'
import { Image, Platform, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TextApp } from '../components/ui/TextApp'
import { AuthContext } from '../context/AuthContext'
import { bgColor, lightGrey, mediumGrey } from '../theme/variables'
import { globalStyles } from '../theme/globalStyles';
import { ModalConfirmation } from '../components/modals/ModalConfirmation';

export const CustomDrawer = (props: any) => {

    const { user, logout } = useContext(AuthContext)
    const [confirmation, setConfirmation] = useState(false)

    return (
        <View style={{ flex: 1 }}>

            <View style={{ height: 150, position: "relative" }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#014454', '#487F25']}
                    useAngle={true}
                    angle={45}
                />
                <View style={{ position: "absolute", top: Platform.OS === "android" ? 0 : 30, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/qc-logo.png')}
                        style={{ width: 97, height: 70 }}
                    />
                </View>
            </View>

            <View style={{ ...globalStyles.flexRow, backgroundColor:bgColor, paddingLeft: 15, paddingVertical: 15, marginBottom: 20}}>
                <View
                    style={{ width: 40, height: 40 }}>
                    <Image source={{ uri: user?.profile }} style={{ flex: 1, borderRadius: 100 }} />
                </View>
                <TextApp size='s' style={{marginLeft: 10}}>Hello {user?.name!}!</TextApp>
            </View>



            <DrawerContentScrollView {...props} style={{ marginTop: Platform.OS === "ios" ? -55 : -5 }}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <TouchableOpacity
                onPress={() => setConfirmation(true)}
                style={{ ...globalStyles.flexRow, padding: 20, marginBottom: Platform.OS === "ios" ? 20 : 10, borderTopWidth: .5, borderTopColor: mediumGrey }}
            >
                <Icon size={25} name="log-out-outline" />
                <TextApp style={{ marginLeft: 10 }}>Logout</TextApp>
            </TouchableOpacity>

            <ModalConfirmation
                openModal={setConfirmation}
                modal={confirmation}
                action={() => {
                    logout()
                    setConfirmation(false)
                }}
                message="Are you sure you want to logout?"
                confirmText='Logout'
            />
        </View>
    )
}
