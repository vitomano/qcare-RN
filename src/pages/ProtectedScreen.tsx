import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {


  const {user, logout} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>
      <Button
        title="Logout"
        color="#5856d6"
        onPress={logout}
      />
        <Text>
        {JSON.stringify(user, null,3)}  
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize: 20,
      marginBottom: 20,
    }
});