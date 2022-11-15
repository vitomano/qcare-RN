import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { ProfileScreen } from '../pages/ProfileScreen';
import { TabStack } from './TabStack';
import { IntakesScreen } from '../pages/IntakesScreen';
import { greenMain } from '../theme/variables';

const Drawer = createDrawerNavigator();

export const DrawerNav = () => {
    return (
        <Drawer.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Drawer.Screen 
             name="HomePageScreen"
             component={TabStack}
             options={{
                 title: 'Home',
             }}
            />

            <Drawer.Screen 
             name="ProfileScreen"
             component={ProfileScreen}
             options={{
                 title: 'Profile',
                 headerShown: true,
                 headerStyle: {
                    backgroundColor: greenMain,
                    elevation: 0,
                    shadowColor: 'transparent',
                    
                  },
                  headerTintColor: '#fff',
             }}
            />
        </Drawer.Navigator>
    );
}