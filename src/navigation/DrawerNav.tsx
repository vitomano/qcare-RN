import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { TabStack } from './TabStack';
import { UserStack } from './UserStack';
import { CustomDrawer } from './CustomDrawer';
import { greenMain, lightGreen, text } from '../theme/variables';

const Drawer = createDrawerNavigator();


export const DrawerNav = () => {
    return (
        <Drawer.Navigator
        drawerContent={ props => <CustomDrawer {...props}/> }
        screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
            drawerActiveBackgroundColor: lightGreen,
            drawerActiveTintColor: greenMain,
            drawerInactiveTintColor: text
        }}
        >
            <Drawer.Screen 
             name="ReportsPageScreen"
             component={TabStack}
             options={{
                 title: 'Reports',
                 drawerIcon: ({color}) => <Icon name="reader-outline" size={25} style={{ color, marginRight: -15 }} />

             }}
            />

            <Drawer.Screen 
             name="UserStack"
             component={UserStack}
             options={{
                 title: 'Profile',
                 drawerIcon: ({color}) => <Icon name="person-outline" size={25} style={{ color, marginRight: -15 }} />
             }}
            />
        </Drawer.Navigator>
    );
}