import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { ProtectedScreen } from '../pages/ProtectedScreen';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const StackNav = () => {

  const { status } = useContext(AuthContext)

  if (status === 'checking') return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}
    >
      {
        status == 'loggedIn'
          ? <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />

          :
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>

      }
    </Stack.Navigator>
  );
}