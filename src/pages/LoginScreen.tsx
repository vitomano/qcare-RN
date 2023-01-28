import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonStyled from '../components/ui/ButtonStyled';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';

import SplashScreen from 'react-native-splash-screen'

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

  const { login, errorMessage = "", removeError } = useContext(AuthContext);
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    SplashScreen.hide();
  }, [])


  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Invalid Login', `Email or password aren't correct`, [{
      text: 'OK',
      onPress: removeError
    }])
  }, [errorMessage])


  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  const onLogin = () => {
    login({ email, password })
    Keyboard.dismiss()
  };


  return (

    <>
      <LinearGradient
        colors={['#014454', '#487F25']}
        useAngle={true}
        angle={45}
        style={styles.bgColor}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >


        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            source={require('../assets/qc-logo.png')}
            style={{ width: 100, height: 73, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 30 }}>
            Login
          </Text>

          <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 30 }}>
            <Icon name="person-outline" size={22} color="rgba(255,255,255,0.5)" style={{ marginRight: 10, paddingBottom: 5 }} />
            <TextInput
              style={styles.textInput}
              keyboardType='email-address'
              placeholder='email'
              placeholderTextColor="rgba(255,255,255,0.4)"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onSubmitEditing={onLogin}
              onChangeText={text => onChange(text, 'email')}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 40, position: "relative" }}>
            <Icon name="key-outline" size={22} color="rgba(255,255,255,0.5)" style={{ marginRight: 10, paddingBottom: 5 }} />

            <View>

            </View>
            <TextInput
              style={styles.textInput}
              placeholder='password'
              placeholderTextColor="rgba(255,255,255,0.4)"
              autoCorrect={false}
              secureTextEntry={hidden}

              value={password}
              onSubmitEditing={onLogin}
              onChangeText={text => onChange(text, 'password')}
            />
            <TouchableOpacity
              activeOpacity={.9}
              onPress={() => setHidden(!hidden)}
              style={{ position: "absolute", right: 0, bottom: 5 }}
            >
              <Icon name={hidden ? "eye-outline" : "eye-off-outline"} size={22} color="rgba(255,255,255,0.5)" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>

          <ButtonStyled
            text='Login'
            width={60}
            outline
            secondary
            onPress={onLogin}
          />


          {/* <View style={marginStyles.mt4}>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={{ color: '#fff' }}>Register</Text>
          </TouchableOpacity>
        </View> */}


        </View>


      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  bgColor: {
    flex: 1,
    backgroundColor: '#487F25',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  textInput: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    height: 40,
    color: 'white',
    fontSize: 16
  }
});