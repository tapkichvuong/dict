import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@rneui/themed'
import { useFonts } from 'expo-font';

import NavBar from './src/screen/NavBar'

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Roboto-Thin.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <NavBar/>
          <StatusBar/>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}