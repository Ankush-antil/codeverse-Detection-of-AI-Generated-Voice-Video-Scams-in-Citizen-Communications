import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
  Switch, Alert, StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setOfflineMode, toggleProtection } from '../store/settingsSlice';
import { clearLogs } from '../store/logsSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../navigation/types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

type SettingsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function SettingsScreen({ navigation }: { navigation: SettingsNavigationProp }) {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const authName = useSelector((state: RootState) => state.auth.name);
  const { i18n } = useTranslation();

  const [notifications, setNotifications] = useState(true);
  const [autoBlock, setAutoBlock] = useState(false);

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Delete all threat logs and scan activity?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear Data', style: 'destructive', onPress: () => { dispatch(clearLogs()); Alert.alert('Cleared', 'Activity history cleared.'); } },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1119" />
      <Text style={styles.header}>Settings</Text>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <MaterialCommunityIcons name="shield-account" size={42} color="#00D4FF" />
        </View>
        <Text style={styles.profileName}>{authName || 'Protected User'}</Text>
        <Text style={styles.profileEmail}>user@airakshak.in</Text>
      </View>

      {/* Protection Settings */}
      <Text style={styles.sectionLabel}>Protection Settings</Text>
      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <MaterialCommunityIcons name="bell" size={22} color="#00D4FF" />
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#3A4560', true: '#00ABD1' }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.settingRow}>
          <MaterialCommunityIcons name="shield-check" size={22} color="#00D4FF" />
          <Text style={styles.settingLabel}>Real-time Protection</Text>
          <Switch
            value={settings.protectionActive}
            onValueChange={(_val: boolean) => { dispatch(toggleProtection()); }}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#3A4560', true: '#00ABD1' }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.settingRow}>
          <MaterialCommunityIcons name="shield-lock" size={22} color="#00D4FF" />
          <Text style={styles.settingLabel}>Auto-block Threats</Text>
          <Switch
            value={autoBlock}
            onValueChange={setAutoBlock}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#3A4560', true: '#00ABD1' }}
          />
        </View>
      </View>

      {/* Language */}
      <Text style={styles.sectionLabel}>Language</Text>
      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('LanguageSelection')}>
          <MaterialCommunityIcons name="translate" size={22} color="#00D4FF" />
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingValue}>{settings.language.toUpperCase()}</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#8A9BB5" />
        </TouchableOpacity>
      </View>

      {/* Security */}
      <Text style={styles.sectionLabel}>Security</Text>
      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('FamilyProtection')}>
          <MaterialCommunityIcons name="account-group" size={22} color="#00D4FF" />
          <Text style={styles.settingLabel}>Family Protection</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#8A9BB5" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingRow} onPress={handleClearHistory}>
          <MaterialCommunityIcons name="delete-sweep" size={22} color="#FF3B4E" />
          <Text style={[styles.settingLabel, { color: '#FF3B4E' }]}>Clear Activity History</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#8A9BB5" />
        </TouchableOpacity>
      </View>

      {/* About */}
      <Text style={styles.sectionLabel}>About AI RAKSHAK</Text>
      <View style={styles.aboutCard}>
        <View style={styles.aboutTop}>
          <MaterialCommunityIcons name="shield-check" size={44} color="#00D4FF" />
          <View style={{ flex: 1 }}>
            <Text style={styles.aboutName}>AI RAKSHAK</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutAccuracy}>Voice: 97.3% | Video: 94.8%</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.aboutDesc}>
          AI RAKSHAK protects you from AI-generated voice and video scams with 97%+ accuracy. First India-specific solution with offline capabilities.
        </Text>
      </View>

      <Text style={styles.madeInIndia}>Made in India with ❤️</Text>
      <Text style={styles.copyright}>© 2025 AI RAKSHAK. All rights reserved.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E1119', paddingTop: 60 },
  header: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', paddingHorizontal: 20, marginBottom: 22 },

  profileCard: {
    backgroundColor: '#181E2E',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 28,
    paddingVertical: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232D42',
    gap: 6,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(0,212,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  profileName: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  profileEmail: { color: '#8A9BB5', fontSize: 14 },

  sectionLabel: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', paddingHorizontal: 20, marginBottom: 10 },
  settingsCard: {
    backgroundColor: '#181E2E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#232D42',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  settingLabel: { flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  settingValue: { color: '#8A9BB5', fontSize: 15, marginRight: 4 },
  divider: { height: 1, backgroundColor: '#232D42', marginHorizontal: 18 },

  version: { textAlign: 'center', color: '#3A4560', fontSize: 13, marginBottom: 40, marginTop: 10 },

  aboutCard: {
    backgroundColor: '#181E2E', borderRadius: 16, marginHorizontal: 20,
    marginBottom: 24, borderWidth: 1, borderColor: '#232D42', overflow: 'hidden', padding: 18,
  },
  aboutTop: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  aboutName: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  aboutVersion: { color: '#8A9BB5', fontSize: 13, marginTop: 2 },
  aboutAccuracy: { color: '#00D4FF', fontSize: 13, fontWeight: '700', marginTop: 4 },
  aboutDesc: { color: '#8A9BB5', fontSize: 14, lineHeight: 22 },

  madeInIndia: { textAlign: 'center', color: '#FFFFFF', fontSize: 15, fontWeight: '600', marginBottom: 6 },
  copyright: { textAlign: 'center', color: '#3A4560', fontSize: 12, marginBottom: 40 },
});
