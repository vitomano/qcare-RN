import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';
import { ReportsScreen } from '../pages/ReportsScreen';
import { ReportScreen } from '../pages/ReportScreen';
import { bgColor, greenMain } from '../theme/variables';
import { TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { FilterScreen } from '../pages/FilterScreen';


export type ReportsStackParams = {
  ReportsScreen: undefined,
  ReportScreen: { id: string }
  FilterScreen: { query:string, page:number }
}

interface Props extends DrawerScreenProps<any, any> { }

const Stack = createStackNavigator<ReportsStackParams>();

export const ReportsStack = ({ navigation }: Props) => {

  return (
    <Stack.Navigator
      screenOptions={{
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
            style={{ marginRight: 15 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon name="menu-outline" size={25} style={{ color: "#fff" }} />
          </TouchableOpacity>
      }}
    >
      <Stack.Screen
        options={{ title: "Reports" }}
        name="ReportsScreen"
        component={ReportsScreen}
      />

      <Stack.Screen
        options={{ title: "Reports" }}
        name="FilterScreen"
        component={FilterScreen}
      />

      <Stack.Screen
        options={{ title: "Report" }}
        name="ReportScreen"
        component={ReportScreen}
      />


    </Stack.Navigator>
  );
}