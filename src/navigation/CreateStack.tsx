import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { greenMain } from '../theme/variables';
import { NewReportScreen } from '../pages/NewReportScreen';
import { Fruit } from '../interfaces/interfaces';

export type CreateStackParams = {
  NewReportSelectScreen: undefined,
  NewReportScreen: { fruit: Fruit }
}
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { NewReportSelectScreen } from '../pages/NewReportSelectScreen';

interface Props extends DrawerScreenProps<any,any>{}


const Stack = createStackNavigator<CreateStackParams>();

export const CreateStack = ({navigation}:Props) => {


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
        options={{ title: "Create New" }}
        name="NewReportSelectScreen"
        component={NewReportSelectScreen}
      />
      <Stack.Screen
        options={{ title: "Create New" }}
        name="NewReportScreen"
        component={NewReportScreen}
      />


    </Stack.Navigator>
  );
}