import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { LoadingScreen } from '../pages/LoadingScreen';
import { DrawerNav } from './DrawerNav';

const Stack = createStackNavigator();

export const StackNav = () => {

  const { status } = useContext(AuthContext)

  if (status === 'checking') return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        status == 'loggedIn'
          ? <>
            <Stack.Screen name="MainStack" component={ DrawerNav } />
          </>

          :
          <>
            <Stack.Screen name="LoginScreen" component={ LoginScreen } options={{headerShown:false}}/>
            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } options={{headerShown:false}}/>
          </>

      }
    </Stack.Navigator>
  );
}