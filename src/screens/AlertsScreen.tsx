import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FilterType = 'All' | 'Voice' | 'Video';

const ICON_MAP: Record<string, any> = {
  Call: 'microphone',
  'WhatsApp Audio': 'microphone',
  Video: 'video',
};

export default function AlertsScreen() {
  const scanHistory = useSelector((state: RootState) => state.logs.history);
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = scanHistory.filter((log) => {
    if (filter === 'Voice') return log.type === 'Call' || log.type === 'WhatsApp Audio';
    if (filter === 'Video') return log.type === 'Video' || log.type === 'WhatsApp Audio';
    return true;
  });

  const labelFor = (log: (typeof scanHistory)[0]) => {
    if (log.type === 'Call' || log.type === 'WhatsApp Audio') return 'Voice Scan';
    return 'Video Scan';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1119" />
      <Text style={styles.header}>Alerts &amp; History</Text>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['All', 'Voice', 'Video'] as FilterType[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            {filter === f && <MaterialCommunityIcons name="check" size={14} color="#00D4FF" />}
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyBox}>
          <MaterialCommunityIcons name="shield-check-outline" size={70} color="#34C759" />
          <Text style={styles.emptyTitle}>All Clear</Text>
          <Text style={styles.emptyDesc}>No scan history yet.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Title row */}
              <View style={styles.cardTop}>
                <MaterialCommunityIcons
                  name={ICON_MAP[item.type] || 'waveform'}
                  size={22}
                  color={item.result === 'AI' ? '#FF3B4E' : '#34C759'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{labelFor(item)}</Text>
                  <Text style={styles.cardDate}>
                    {new Date(item.timestamp).toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
              {/* Result */}
              <Text style={styles.cardResult}>
                {item.result === 'AI' ? '⚠️ AI Scam Detected' : '✅ Content appears genuine'}
              </Text>
              <Text style={styles.cardConf}>
                Confidence: <Text style={styles.confHighlight}>{item.confidence}%</Text>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E1119', paddingTop: 60 },
  header: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', paddingHorizontal: 20, marginBottom: 18 },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#181E2E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#232D42',
  },
  filterTabActive: {
    borderColor: '#00D4FF',
    backgroundColor: 'rgba(0,212,255,0.1)',
  },
  filterText: { color: '#8A9BB5', fontSize: 14, fontWeight: '600' },
  filterTextActive: { color: '#00D4FF' },

  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  emptyDesc: { color: '#8A9BB5', fontSize: 15 },

  card: {
    backgroundColor: '#181E2E',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#232D42',
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  cardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  cardDate: { color: '#8A9BB5', fontSize: 13, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#232D42', marginBottom: 12 },
  cardResult: { color: '#FFFFFF', fontSize: 15, marginBottom: 6 },
  cardConf: { color: '#8A9BB5', fontSize: 14 },
  confHighlight: { color: '#00D4FF', fontWeight: '800' },
});
