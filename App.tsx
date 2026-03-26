import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { customDarkTheme } from './src/theme/darkTheme';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={customDarkTheme}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
