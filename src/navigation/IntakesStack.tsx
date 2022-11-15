import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { bgColor, greenMain } from '../theme/variables';
import { IntakesScreen } from '../pages/IntakesScreen';
import { IntakeScreen } from '../pages/IntakeScreen';

export type IntakesStackParams = {
  IntakesScreen: undefined,
  IntakeScreen: { id: string }
}

const Stack = createStackNavigator<IntakesStackParams>();

export const IntakesStack = () => {

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
        }
      }}
    >
      <Stack.Screen
        options={{ title: "Intakes" }}
        name="IntakesScreen"
        component={IntakesScreen}
      />
      <Stack.Screen
        options={{ title: "Prereport" }}
        name="IntakeScreen"
        component={IntakeScreen}
      />

    </Stack.Navigator>
  );
}