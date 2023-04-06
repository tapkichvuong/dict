import { createStackNavigator } from '@react-navigation/stack';
import Definition from '../components/Definition';
import Home from '../screen/Home';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
        screenOptions={{ 
            headerShown: false,
        }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Definition" component={Definition} />
    </Stack.Navigator>
  );
}

export default HomeStack