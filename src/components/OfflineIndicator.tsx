import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function OfflineIndicator() {
  const offlineMode = useSelector((state: RootState) => state.settings.offlineMode);
  const theme = useTheme();

  if (!offlineMode) return null;

  return (
    <View style={{ backgroundColor: theme.colors.error, padding: 5, alignItems: 'center' }}>
      <Text style={{ color: theme.colors.onError, fontSize: 12, fontWeight: 'bold' }}>OFFLINE MODE - Limited AI Analysis</Text>
    </View>
  );
}
