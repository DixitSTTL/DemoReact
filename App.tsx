/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';


import MainNavigator from './src/navigator/MainNavigator';
import  './src/assets/Localizestring/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
   
    <SafeAreaProvider>
      <NavigationContainer
        theme={isDarkMode ? DarkTheme : DefaultTheme}
      >
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
