import React, { useContext, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { TextApp } from '../components/ui/TextApp';
import { AuthContext } from '../context/AuthContext'
import { globalStyles } from '../theme/globalStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'

import { inputStyles } from '../theme/inputStyles';
import { CentredContent } from '../components/CenterContent';
import ButtonStyled from '../components/ui/ButtonStyled';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import qcareApi from '../api/qcareApi';
import { darkGrey } from '../theme/variables';
import { alertMsg } from '../helpers/alertMsg';

export const UserEditScreen = () => {

  const { user, refresh, loading } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState<Asset | null>(null)
  const [name, setName] = useState(user?.name || "")
  const [lastname, setLastname] = useState(user?.lastname || "")
  const [company, setCompany] = useState(user?.company || "")

  const [saving, setSaving] = useState(false)

  const openLibrary = () => {

    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    }, (res) => {
      setSelectedImg(null)
      if (res.didCancel) return
      if (!res.assets) return

      setSelectedImg({
        uri: Platform.OS === 'ios' ? res.assets[0]?.uri?.replace('file://', '') : res?.assets[0]?.uri || undefined,
        type: res?.assets[0].type,
        fileName: res?.assets[0].fileName
      })
    })
  };



  const saveChanges = async () => {

    if(name.length === 0 || lastname.length === 0 || company.length === 0) return alertMsg("Error", "All fields are requiredHermo")

    setSaving(true)
    try {
      const formData = new FormData();

      (selectedImg) && formData.append('profile', {
        uri: selectedImg.uri,
        type: selectedImg.type,
        name: selectedImg.fileName

      });

      formData.append('name', name)
      formData.append('lastname', lastname)
      formData.append('company', company)


      await qcareApi.put(`/auth/profile/${user?.uid!}`, formData)
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your profile has been updated'
      });
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
      refresh() }
  };



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

          <View style={{ alignSelf: "center", marginBottom: 20 }}>
            <View style={{ position: "relative", width: 100, height: 100, ...globalStyles.shadow, marginBottom: 20, alignSelf: "center" }}>
              <Image source={{ uri: selectedImg === null ? user?.profile : selectedImg.uri }} style={{ flex: 1, borderRadius: 100 }} />

              <TouchableOpacity
                activeOpacity={.9}
                onPress={openLibrary}
                style={{ position: "absolute", padding: 5, bottom: -5, right: -5, backgroundColor: darkGrey, borderRadius: 100 }}>
                <Icon size={20} name="create-outline" color="#fff" />
              </TouchableOpacity>

            </View>
            <TextApp bold size='m' center>Edit Profile</TextApp>
          </View>


          <View style={{ marginBottom: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <TextApp bold style={{ marginBottom: 5 }}>Name</TextApp>

              <TextInput
                keyboardType='default'
                autoCapitalize="none"
                value={name}
                autoCorrect={false}
                style={{ ...inputStyles.input, flex: 1 }}
                onChangeText={(e) => setName(e as string)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <TextApp bold style={{ marginBottom: 5 }}>Last name</TextApp>

              <TextInput
                keyboardType='default'
                autoCapitalize="none"
                value={lastname}
                autoCorrect={false}
                style={{ ...inputStyles.input, flex: 1 }}
                onChangeText={(e) => setLastname(e as string)}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <TextApp bold style={{ marginBottom: 5 }}>Company</TextApp>

              <TextInput
                keyboardType='default'
                autoCapitalize="none"
                value={company}
                autoCorrect={false}
                style={{ ...inputStyles.input, flex: 1 }}
                onChangeText={(e) => setCompany(e as string)}
              />
            </View>
          </View>

          <CentredContent>
            <ButtonStyled
              text='Save Changes'
              blue
              width={60}
              onPress={saveChanges}
              loading={saving}
            />
          </CentredContent>

        </View>



      </ScrollView>
    </KeyboardAvoidingView >
  )
}
