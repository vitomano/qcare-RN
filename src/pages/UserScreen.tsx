import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, KeyboardAvoidingView, Platform, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { CardContact } from '../components/cards/CardContact'
import { TextApp } from '../components/ui/TextApp';
import { AuthContext } from '../context/AuthContext'
import { globalStyles } from '../theme/globalStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import { blue, danger } from '../theme/variables'
import { ModalBlock } from '../components/modals/ModalBlock'
import { AddContact } from '../components/AddContact'
import { ModalConfirmation } from '../components/modals/ModalConfirmation';
import { useNavigation } from '@react-navigation/native';

export const UserScreen = () => {

  const { user, logout, refresh, loading } = useContext(AuthContext)

  const navigation = useNavigation()
  
  const [addContact, setAddContact] = useState(false)
  const [confirmation, setConfirmation] = useState(false)  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
          />
        }
        style={{ ...globalStyles.containerFlex }}>

        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60 }}>

          <View style={{ alignSelf: "center" }}>
            <View style={{ width: 100, height: 100, ...globalStyles.shadow, marginBottom: 10, alignSelf: "center" }}>
              <Image source={{ uri: user?.profile }} style={{ flex: 1, borderRadius: 100 }} />
            </View>
            <TextApp bold size='m' center>{user?.name! || "--"} {user?.name && user?.lastname && (user?.lastname?.charAt(0) + ".")}</TextApp>
            {
              user?.company &&
              <TextApp center>{user.company}</TextApp>
            }
          </View>

          <TouchableOpacity
          activeOpacity={.9}
          style={{ marginVertical: 10 }}
          onPress={ ()=>navigation.navigate('UserEditScreen' as any) }
          >
            <TextApp color='mute' size='s' center>edit profile</TextApp>
          </TouchableOpacity>



          < View style={{ ...globalStyles.shadow, padding: 10, backgroundColor: "white", borderRadius: 10, marginTop: 10 }}>
            {
              user?.contacts?.length! > 0
                ?
                <>
                  <TextApp bold size='m' style={{ marginVertical: 10 }}>Contacts</TextApp>
                  {
                    user?.contacts?.map(contact => (
                      <CardContact
                        key={contact.id}
                        contact={contact}
                      />
                    ))
                  }
                </>
                :
                <TextApp bold center size='m'>No Contacts</TextApp>
            }
            <TouchableOpacity
              activeOpacity={.9}
              onPress={() => setAddContact(true)}
              style={{ marginTop: 25, marginBottom: 20, backgroundColor: blue, width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 50, alignSelf: "center" }}>
              <Icon size={30} name="add-outline" color="#fff" />
            </TouchableOpacity>
          </View>

          <ModalBlock
            modal={addContact}
            openModal={setAddContact}
            style={{ padding: 20 }}
          >
            <AddContact
              setAddContact={setAddContact}
            />
          </ModalBlock>

          <TouchableOpacity
            onPress={()=>setConfirmation(true)}
            style={{ ...globalStyles.flexRow, alignSelf: "center", marginTop: 30 }}
          >
            <TextApp color='danger'>Logout </TextApp>
            <Icon size={20} name="log-out-outline" color={danger} />
          </TouchableOpacity>

          <ModalConfirmation
            openModal={setConfirmation}
            modal={confirmation}
            action={()=>{
              logout()
              setConfirmation(false)
            }}
            message="Are you sure you want to logout"
            loading={loading}
          />

        </View>



      </ScrollView>
    </KeyboardAvoidingView >
  )
}
