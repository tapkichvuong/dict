import React from 'react';
import { Icon } from '@rneui/themed'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {StyleSheet, Text} from 'react-native'
import User from '../screen/User'
import Bookmark from '../screen/Bookmark'
import Home from '../screen/Home'

const Tab = createBottomTabNavigator();

function NavBar(){
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: "#9EF78D",
                tabBarInactiveTintColor: "#000",
                tabBarActiveBackgroundColor: '#548787',
                tabBarItemStyle: {
                    height: 60,
                    borderTopRightRadius: 20,//add border top right radius
                    borderTopLeftRadius: 20,//add border top left radius
                    paddingVertical:3
                },
                tabBarStyle: {
                    height: 60,
                },
            }}
        >
            <Tab.Screen 
                name="Home"
                component={Home} 
                options = {{
                    tabBarLabel: ({ focused }) => {
                        return <Text style={styles.label}>{focused ? "Home": ""}</Text>
                    },
                    tabBarIcon:({ color, size }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            color={color}
                            size={size}
                        />
                    ),
                    

                }}
            />
            <Tab.Screen 
                name="Bookmark"
                component={Bookmark} 
                options = {{
                    tabBarLabel: ({ focused }) => {
                        return <Text style={styles.label}>{focused ? "Bookmark": ""}</Text>
                    },
                    tabBarIcon:({ color, size }) => (
                        <Icon
                            name='bookmark'
                            type='font-awesome'
                            color={color}
                            size={size}
                        />
                    ),
                    

                }}
            />
            <Tab.Screen 
                name="User" 
                component={User}
                options = {{
                    tabBarLabel: ({ focused }) => {
                        return <Text style={styles.label}>{focused ? "User": ""}</Text>
                    },
                    tabBarIcon:({ color, size }) => (
                        <Icon
                            name='user'
                            type='font-awesome'
                            color={color}
                            size={size}
                        />
                    ),
                    
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12, 
        fontWeight: '500', 
        color: '#9EF78D'
    },
})

export default NavBar;