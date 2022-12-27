import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { bgColor, blue } from '../theme/variables';
import { PreReportsScreen } from '../pages/PreReportsScreen';
import { PreReportScreen } from '../pages/PreReportScreen';
import { PreReportFinishScreen } from '../pages/PreReportFinishScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';

interface Props extends DrawerScreenProps<any,any>{}

export type PreReportsStackParams = {
  PreReportsScreen: undefined,
  PreReportScreen: { id: string }
  PreReportFinishScreen: { id: string }
}

const Stack = createStackNavigator<PreReportsStackParams>();

export const PrereportsStack = ({navigation}:Props) => {

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
          style={{marginRight: 15}}
          onPress={()=> navigation.toggleDrawer() }
        >
          <Icon name="menu-outline" size={25} style={{ color: "#fff" }} />
        </TouchableOpacity>
      }}
    >
      <Stack.Screen
        options={{ title: "Pre Reports" }}
        name="PreReportsScreen"
        component={PreReportsScreen}
      />
      <Stack.Screen
        options={{ title: "Pre Report" }}
        name="PreReportScreen"
        component={PreReportScreen}
      />

      <Stack.Screen
        options={{ title: "Finish Pre Report" }}
        name="PreReportFinishScreen"
        component={PreReportFinishScreen}
      />

    </Stack.Navigator>
  );
}