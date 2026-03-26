import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import FamilyProtectionScreen from '../screens/FamilyProtectionScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0E1119',
  },
};

const DARK_BG = '#0E1119';

export default function AppNavigator() {
  const isRegistered = useSelector((state: RootState) => state.auth.isRegistered);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: DARK_BG },
          animation: 'fade',
          animationDuration: 250,
        }}
      >
        {!isRegistered ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ animation: 'none' }}
            />
            <Stack.Screen
              name="LanguageSelection"
              component={LanguageSelectionScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ animation: 'none' }}
            />
            <Stack.Screen 
              name="FamilyProtection" 
              component={FamilyProtectionScreen} 
              options={{
                headerShown: true,
                title: 'Family Protection',
                headerBackTitle: 'Back',
                animation: 'fade',
              }} 
            />
            <Stack.Screen 
              name="LanguageSelection" 
              component={LanguageSelectionScreen} 
              options={{ 
                headerShown: true, 
                title: 'Change Language', 
                headerBackTitle: 'Back',
                headerStyle: { backgroundColor: DARK_BG },
                headerTintColor: '#FFFFFF',
                animation: 'fade',
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
