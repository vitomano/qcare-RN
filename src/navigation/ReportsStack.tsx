import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { ReportsScreen } from '../pages/ReportsScreen';
import { ReportScreen } from '../pages/ReportScreen';
import { bgColor, greenMain } from '../theme/variables';

export type ReportsStackParams = {
  ReportsScreen: undefined,
  ReportScreen: { id: string }
}

const Stack = createStackNavigator<ReportsStackParams>();

export const ReportsStack = () => {


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
        // cardStyle: {
        //   backgroundColor: bgColor
        // }
      }}
    >
      <Stack.Screen
        options={{ title: "Reports" }}
        name="ReportsScreen"
        component={ReportsScreen}
      />
      <Stack.Screen
        options={{ title: "Report" }}
        name="ReportScreen"
        component={ReportScreen}
      />


    </Stack.Navigator>
  );
}