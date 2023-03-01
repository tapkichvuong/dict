import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@rneui/themed'
import NavBar from './src/screen/NavBar'

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <NavBar/>
        </NavigationContainer>
        <StatusBar/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}