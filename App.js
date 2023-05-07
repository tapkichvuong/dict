import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@rneui/themed'
import StackNav from './src/navigator/StackNav'
import 'expo-dev-client';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
        <StatusBar/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}