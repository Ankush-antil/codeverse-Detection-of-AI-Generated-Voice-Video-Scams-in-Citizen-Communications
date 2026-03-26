import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { BottomTabParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import CallAnalysisScreen from '../screens/CallAnalysisScreen';
import VideoAnalysisScreen from '../screens/VideoAnalysisScreen';
import AlertsScreen from '../screens/AlertsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        sceneStyle: { backgroundColor: '#0E1119' },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.background },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help-circle';
          if (route.name === 'Home') iconName = 'shield-home';
          else if (route.name === 'CallAnalysis') iconName = 'phone-alert';
          else if (route.name === 'VideoAnalysis') iconName = 'video-account';
          else if (route.name === 'Alerts') iconName = 'bell-ring';
          else if (route.name === 'Settings') iconName = 'cog';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('dashboard') }} />
      <Tab.Screen name="CallAnalysis" component={CallAnalysisScreen} options={{ title: t('analyze') }} />
      <Tab.Screen name="VideoAnalysis" component={VideoAnalysisScreen} options={{ title: t('video') }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ title: t('alerts') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
    </Tab.Navigator>
  );
}
