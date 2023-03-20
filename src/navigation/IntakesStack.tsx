import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


import { createStackNavigator } from '@react-navigation/stack';
import { bgColor, greenMain } from '../theme/variables';
import { IntakesScreen } from '../pages/IntakesScreen';
import { IntakeScreen } from '../pages/IntakeScreen';
import { TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { IntakeUploadScreen } from '../pages/IntakeUploadScreen';

export type IntakesStackParams = {
  IntakesScreen: undefined,
  IntakeUploadScreen: undefined,
  IntakeScreen: { id: string }
}

interface Props extends DrawerScreenProps<any,any>{}


const Stack = createStackNavigator<IntakesStackParams>();

export const IntakesStack = ({navigation}:Props) => {

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
          style={{marginRight: 15}}
          onPress={()=> navigation.toggleDrawer() }
        >
          <Icon name="menu-outline" size={25} style={{ color: "#fff" }} />
        </TouchableOpacity>
      }}
    >
      <Stack.Screen
        options={{ title: "Intakes" }}
        name="IntakesScreen"
        component={IntakesScreen}
      />
      <Stack.Screen
        options={{ title: "Create Pre Report" }}
        name="IntakeScreen"
        component={IntakeScreen}
      />

      <Stack.Screen
        options={{ title: "Upload Intake" }}
        name="IntakeUploadScreen"
        component={IntakeUploadScreen}
      />

    </Stack.Navigator>
  );
}