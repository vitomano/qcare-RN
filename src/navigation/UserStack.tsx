import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { UserScreen } from '../pages/UserScreen';
import { UserEditScreen } from '../pages/UserEditScreen';
import { bgColor, greenMain } from '../theme/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';

interface Props extends DrawerScreenProps<any,any>{}

export type UserStackParams = {
  UserScreen: undefined,
  UserEditScreen: undefined,
}

const Stack = createStackNavigator<UserStackParams>();

export const UserStack = ({ navigation }:Props) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: greenMain,
          elevation: 0,
          shadowColor: 'transparent',

        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: bgColor
        },
        headerRight: ({ }) =>
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={()=> navigation.toggleDrawer() }
        >
          <Icon name="menu-outline" size={25} style={{ color: "#fff" }} />
        </TouchableOpacity>
        
      }}
    >
      <Stack.Screen
        options={{ title: "Profiles" }}
        name="UserScreen"
        component={UserScreen}
      />
      <Stack.Screen
        options={{ title: "Edit Profile" }}
        name="UserEditScreen"
        component={UserEditScreen}
      />

    </Stack.Navigator>
  );
}