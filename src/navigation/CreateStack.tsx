import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { greenMain } from '../theme/variables';
import { NewReportScreen } from '../pages/NewReportScreen';
import { SelectReport } from '../pages/SelectReport';
import { Fruit } from '../interfaces/interfaces';

export type ProductStackParams = {
  SelectReport: undefined,
  NewReportScreen: { fruit: Fruit }
}

const Stack = createStackNavigator<ProductStackParams>();

export const CreateStack = () => {


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

    }}
    >
      <Stack.Screen
        options={{ title: "Create New" }}
        name="SelectReport"
        component={SelectReport}
      />
      <Stack.Screen
        options={{ title: "Create New" }}
        name="NewReportScreen"
        component={NewReportScreen}
      />


    </Stack.Navigator>
  );
}