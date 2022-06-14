import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';
import { ReportsScreen } from '../pages/ReportsScreen';
import { ReportScreen } from '../pages/ReportScreen';

export type ProductStackParams = {
  ReportsScreen: undefined,
  ReportScreen: {id?:string}
}

const Stack = createStackNavigator<ProductStackParams>();

export const ReportsStack = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}
    >
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />

      
    </Stack.Navigator>
  );
}