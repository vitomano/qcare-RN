import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { bgColor, blue } from '../theme/variables';
import { LifeTestsScreen } from '../pages/LifeTestsScreen';
import { LifeTestScreen } from '../pages/LifeTestScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { FilterLifeScreen } from '../pages/FilterLifeScreen';

interface Props extends DrawerScreenProps<any, any> { }

export type LifeTestStackParams = {
  // LifeTestsScreen: {query?: string | null},
  LifeTestsScreen: undefined,
  LifeTestScreen: { id: string }
  FilterLifeScreen: { query: string, page: number }
}

const Stack = createStackNavigator<LifeTestStackParams>();

export const LifeTestStack = ({ navigation }: Props) => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: blue,
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
            style={{ marginRight: 15 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon name="menu-outline" size={25} style={{ color: "#fff" }} />
          </TouchableOpacity>
      }}
    >
      <Stack.Screen
        options={{ title: "Life Test" }}
        name="LifeTestsScreen"
        component={LifeTestsScreen}
      />

      <Stack.Screen
        options={{ title: "Life Test Result" }}
        name="FilterLifeScreen"
        component={FilterLifeScreen}
      />


      <Stack.Screen
        options={{ title: "Life Test" }}
        name="LifeTestScreen"
        component={LifeTestScreen}
      />

    </Stack.Navigator>
  );
}