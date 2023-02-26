import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import User from './User'
import Home from './Home'
import Fontawesome from '@expo/vector-icons'
import { StyleSheet} from 'react-native'

const Tab = createMaterialBottomTabNavigator();

function NavBar(){
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                option = {{
                    tabBarLabel:() => {return null},
                    tabBarIcon:({ color, size }) => (
                        <Fontawesome name='home'color={color} size={size}/>
                    )
                }}
                component={Home} 
            />
            <Tab.Screen 
                name="User" 
                option = {{
                    tabBarLabel:() => {return null},
                    tabBarIcon:({ color, size }) => (
                        <Fontawesome name='user'color={color} size={size}/>
                    )
                }}
                component={User} 
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    view : {
        height: 60,
    },
});

export default NavBar;