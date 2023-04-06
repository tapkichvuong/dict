import { createStackNavigator } from '@react-navigation/stack';
import Bookmark from '../screen/Bookmark';
import Definition from '../components/Definition';

const Stack = createStackNavigator();

function BMStack() {
  return (
    <Stack.Navigator
        screenOptions={{ 
            headerShown: false,
        }}
    >
      <Stack.Screen name="Bookmark" component={Bookmark} />
      <Stack.Screen name="Definition" component={Definition} />

    </Stack.Navigator>
  );
}

export default BMStack