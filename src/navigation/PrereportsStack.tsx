import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { bgColor, blue, greenMain } from '../theme/variables';
import { PreReportsScreen } from '../pages/PreReportsScreen';
import { PreReportScreen } from '../pages/PreReportScreen';

export type PreReportsStackParams = {
  PreReportsScreen: undefined,
  PreReportScreen: { id: string }
}

const Stack = createStackNavigator<PreReportsStackParams>();

export const PrereportsStack = () => {

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
        }
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

    </Stack.Navigator>
  );
}