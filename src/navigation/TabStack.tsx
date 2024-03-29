import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ReportsStack } from './ReportsStack';
import { greenMain } from '../theme/variables';
import { CreateStack } from './CreateStack';
import { IntakesStack } from './IntakesStack';
import { PrereportsStack } from './PrereportsStack';
import { LifeTestStack } from './LifeTestStack';


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
                tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
                tabBarActiveTintColor: "#1a9141",
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                    height: Platform.OS === "android" ? 60 : 80,
                    // paddingBottom: Platform.OS === "android" ? 10 : null,
                },
                tabBarLabelStyle: { paddingVertical: Platform.OS === "android" ? 8 : 0 },
                // tabBarIconStyle: { height: 'auto' }
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
                name="IntakesStack"
                component={IntakesStack}
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
                name="PreReportsStack"
                component={PrereportsStack}
                options={{
                    title: 'Pre Reports',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="archive-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />


            <Tab.Screen
                name="LifeTestStack"
                component={LifeTestStack}
                options={{
                    title: 'Life Test',
                    tabBarIcon: ({ color }) => <Text style={{ color }}>
                        <Icon name="leaf-outline" size={25} style={{ color }} />
                    </Text>
                }}
            />

        </Tab.Navigator>
    );
}