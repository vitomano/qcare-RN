import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { ReportScreen } from '../pages/ReportScreen';
import { bgColor } from '../theme/variables';
import { NewReportScreen } from '../pages/NewReportScreen';
import { SelectReport } from '../pages/SelectReport';

export type ProductStackParams = {
  SelectReport: undefined,
  NewReportScreen: { id?: string }
}

const Stack = createStackNavigator<ProductStackParams>();

export const CreateStack = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        headerStyle: {
          backgroundColor: bgColor,
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: bgColor
        }
      }}
    >
      <Stack.Screen
        options={{ title: "Reports" }}
        name="SelectReport"
        component={SelectReport}
      />
      <Stack.Screen
        options={{ title: "Report" }}
        name="NewReportScreen"
        component={NewReportScreen}
      />


    </Stack.Navigator>
  );
}