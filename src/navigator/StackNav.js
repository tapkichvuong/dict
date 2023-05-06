import { createStackNavigator } from '@react-navigation/stack';
import Definition from '../components/Definition';
import NavBar from './NavBar';

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
        screenOptions={{ 
            headerShown: false,
        }}
    >
      <Stack.Screen name="NavBar" component={NavBar} />
      <Stack.Screen name="Definition" component={Definition} />
    </Stack.Navigator>
  );
}

export default StackNav