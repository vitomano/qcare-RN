import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { LoadingScreen } from '../pages/LoadingScreen';
import { TabStack } from './TabStack';

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
          ? <>
            <Stack.Screen name="TabStack" component={ TabStack } />
            {/* <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} /> */}
          </>

          :
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
          </>

      }
    </Stack.Navigator>
  );
}