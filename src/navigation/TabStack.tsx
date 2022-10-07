import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileScreen } from '../pages/ProfileScreen';
import { ReportsStack } from './ReportsStack';
import { greenMain } from '../theme/variables';
import { CreateStack } from './CreateStack';
import { IntakesScreen } from '../pages/IntakesScreen';
import { PreReportsScreen } from '../pages/PreReportsScreen';


const Tab = createBottomTabNavigator();

export const TabStack = () => {

    const CustomButton = ({ onPress }: any) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{
                top: -22,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
            }}
        >
            <View style={{
                backgroundColor: greenMain,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                width: 60,
                height: 60
            }}>
                <Icon name="add-outline" size={35} style={{ color: "#fff" }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#1a9141",
                tabBarStyle: {
                    marginBottom: 10,
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}

        >
            <Tab.Screen
                name="ReportsStack"
                component={ReportsStack}
                options={{
                    title: 'All Reports',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="list-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />

            <Tab.Screen
                name="IntakesScreen"
                component={IntakesScreen}
                options={{
                    title: 'Intakes',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="enter-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />

            <Tab.Screen
                name="CreateStack"
                component={CreateStack}
                options={{
                    title: 'Create',
                    tabBarButton: (props) => (
                        <CustomButton {...props} />
                    )
                }}
            />


            <Tab.Screen
                name="PreReportsScreen"
                component={PreReportsScreen}
                options={{
                    title: 'Pre Reports',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="archive-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />


            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="leaf-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />
        </Tab.Navigator>
    );
}