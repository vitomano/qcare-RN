import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../pages/LoginScreen';
import { LoadingScreen } from '../pages/LoadingScreen';
import { DrawerNav } from './DrawerNav';
import SplashScreen from 'react-native-splash-screen'


const Stack = createStackNavigator();

export const StackNav = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

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
            {/* <Stack.Screen name="RegisterScreen" component={ RegisterScreen } options={{headerShown:false}}/> */}
          </>

      }
    </Stack.Navigator>
  );
}