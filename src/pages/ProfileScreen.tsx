import React, { useContext } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { bgColor } from '../theme/variables'

export const ProfileScreen = () => {


  const { logout } = useContext(AuthContext)

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColor
    }}>
      <View>
        <Text>Profile</Text>
        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
    </View>
  )
}
