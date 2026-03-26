import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleProtection } from '../store/settingsSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OfflineIndicator from '../components/OfflineIndicator';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const protectionActive = useSelector((state: RootState) => state.settings.protectionActive);
  const scanHistory = useSelector((state: RootState) => state.logs.history);

  const todayScans = scanHistory.filter(
    (l) => new Date(l.timestamp).toDateString() === new Date().toDateString()
  ).length;
  const threatsBlocked = scanHistory.filter((l) => l.result === 'AI').length;

  const QUICK_ACTIONS = [
    { label: 'Analyze Call',      icon: 'phone-check',    color: '#00D4FF', bg: 'rgba(0,212,255,0.15)',   tab: 'CallAnalysis' },
    { label: 'Analyze Video',     icon: 'video-check',    color: '#7C5CFC', bg: 'rgba(124,92,252,0.15)',  tab: 'VideoAnalysis' },
    { label: 'View Alerts',       icon: 'bell-alert',     color: '#FF9F0A', bg: 'rgba(255,159,10,0.15)',  tab: 'Alerts' },
    { label: 'Family Protection', icon: 'account-group',  color: '#34C759', bg: 'rgba(52,199,89,0.15)',   tab: 'FamilyProtection' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1119" />
      <OfflineIndicator />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <MaterialCommunityIcons name="shield-check" size={48} color="rgba(255,255,255,0.9)" />
          <Text style={styles.heroTitle}>AI RAKSHAK</Text>
          <Text style={styles.heroSub}>Protect Yourself from AI Scams</Text>
        </View>

        <View style={styles.body}>
          {/* Protection Status */}
          <Text style={styles.sectionLabel}>Protection Status</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => dispatch(toggleProtection())}
            style={[styles.statusCard, { borderColor: protectionActive ? '#34C759' : '#FF3B30' }]}
          >
            <View style={[styles.statusBg, { backgroundColor: protectionActive ? 'rgba(52,199,89,0.12)' : 'rgba(255,59,48,0.12)' }]} />
            <MaterialCommunityIcons
              name={protectionActive ? 'shield-check' : 'shield-alert'}
              size={34}
              color={protectionActive ? '#34C759' : '#FF3B30'}
            />
            <Text style={[styles.statusText, { color: protectionActive ? '#34C759' : '#FF3B30' }]}>
              {protectionActive ? 'Active' : 'Inactive — Tap to Enable'}
            </Text>
          </TouchableOpacity>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="radar" size={28} color="#00D4FF" />
              <Text style={styles.statNum}>{todayScans}</Text>
              <Text style={styles.statLabel}>Today's Scans</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="shield-alert" size={28} color="#FF3B30" />
              <Text style={styles.statNum}>{threatsBlocked}</Text>
              <Text style={styles.statLabel}>Threats Blocked</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionLabel}>Quick Actions</Text>
          <View style={styles.grid}>
            {QUICK_ACTIONS.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.actionCard}
                onPress={() => navigation.navigate(item.tab)}
                activeOpacity={0.75}
              >
                <View style={[styles.actionIconCircle, { backgroundColor: item.bg }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={30} color={item.color} />
                </View>
                <Text style={styles.actionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E1119' },

  hero: {
    paddingTop: 60,
    paddingBottom: 36,
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0077CC',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: 6,
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },

  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  sectionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 14,
    marginTop: 4,
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginBottom: 18,
    backgroundColor: '#181E2E',
    overflow: 'hidden',
  },
  statusBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  statusText: { fontSize: 20, fontWeight: '800', letterSpacing: 0.3 },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 26,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#181E2E',
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#232D42',
  },
  statNum: { fontSize: 32, fontWeight: '900', color: '#FFFFFF' },
  statLabel: { fontSize: 13, color: '#8A9BB5', fontWeight: '500' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#181E2E',
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#232D42',
  },
  actionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
