import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import StyledButton from '../components/StyledButton';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { globalStyles } from '../theme/globalStyles';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ({navigation}:Props) => {

  const { register, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Invalid Register', `User Already Exist`,[{
          text: 'OK',
          onPress: removeError
        }])
  }, [errorMessage])

  const { email, password, name, company, onChange } = useForm({
    name: '',
    email: '',
    company: '',
    password: ''
  })

  const onRegister = () => {
    Keyboard.dismiss()
    register({name, email, password, company})
  };


  return (

    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image
          source={require('../assets/qc-logo-color.png')}
          style={{ width: 100, height: 73, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#014454", marginBottom: 30 }}>
          Register
        </Text>

        <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 25 }}>
          <Icon name="person-outline" size={22} color="#014454" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            placeholder='name'
            placeholderTextColor="#014454"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onSubmitEditing={onRegister}
            onChangeText={text => onChange(text, 'name')}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 25 }}>
          <Icon name="earth-outline" size={22} color="#014454" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            placeholder='company'
            placeholderTextColor="#014454"
            autoCorrect={false}
            value={company}
            onSubmitEditing={onRegister}
            onChangeText={text => onChange(text, 'company')}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 25 }}>
          <Icon name="mail-outline" size={22} color="#014454" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            keyboardType='email-address'
            placeholder='email'
            placeholderTextColor="#014454"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onSubmitEditing={onRegister}
            onChangeText={text => onChange(text, 'email')}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 40 }}>
          <Icon name="key-outline" size={22} color="#014454" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.textInput}
            placeholder='password'
            placeholderTextColor="#014454"
            autoCorrect={false}
            secureTextEntry

            value={password}
            onSubmitEditing={onRegister}
            onChangeText={text => onChange(text, 'password')}
          />
        </View>

        <StyledButton
        width={60}
          text='Register'
          onPress={onRegister}
        />


        <View style={globalStyles.mt4}>
          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
          >
            <Text style={{ color: "#014454" }}>Login</Text>
          </TouchableOpacity>
        </View>


      </View>


    </KeyboardAvoidingView>
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
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#014454",
    width: '60%',
    height: 40,
    color: "#014454"
  }
});