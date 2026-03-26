import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ThreatActionModalProps = {
  visible: boolean;
  confidence: number;
  type: 'Video' | 'Voice';
  onContinue: () => void;
  onActionComplete: (actionName: string) => void; // Triggered after Report/Block animation finishes (to reset screen)
};

export default function ThreatActionModal({ visible, confidence, type, onContinue, onActionComplete }: ThreatActionModalProps) {
  const [processing, setProcessing] = useState<string | null>(null);

  const handleAction = (action: 'Report' | 'Block') => {
    setProcessing(action);
    // Simulate automated system blocking/reporting the call
    setTimeout(() => {
      setProcessing(null);
      onActionComplete(action);
    }, 2000);
  };

  return (
    <Portal>
      <Modal visible={visible} dismissable={false} contentContainerStyle={styles.modalBg}>
        {processing ? (
          <View style={styles.processingBox}>
            <ActivityIndicator size="large" color="#FF3B30" />
            <Text style={styles.processingText}>
              {processing === 'Block' ? 'Disconnecting & Blocking Number...' : 'Disconnecting & Reporting to Cyber Cell...'}
            </Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.warningCircle}>
              <MaterialCommunityIcons name="alert" size={50} color="#FF3B30" />
            </View>
            
            <Text style={styles.title}>CRITICAL ALERT</Text>
            <Text style={styles.subtitle}>
              AI-RAKSHAK detected an AI {type} Scan ({confidence}% Match). This is a highly likely scam attempt.
            </Text>

            <TouchableOpacity style={styles.blockBtn} onPress={() => handleAction('Block')}>
              <MaterialCommunityIcons name="phone-cancel" size={24} color="#FFF" />
              <Text style={styles.blockBtnText}>Cut Call & Block</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reportBtn} onPress={() => handleAction('Report')}>
              <MaterialCommunityIcons name="police-badge" size={24} color="#FFF" />
              <Text style={styles.reportBtnText}>Cut Call & Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
              <Text style={styles.continueBtnText}>Ignore & Continue {type === 'Voice' ? 'Call' : 'Video'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalBg: { backgroundColor: '#1C1C1E', margin: 25, borderRadius: 25, overflow: 'hidden', elevation: 20 },
  content: { padding: 30, alignItems: 'center' },
  warningCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255, 59, 48, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: 'rgba(255, 59, 48, 0.4)' },
  title: { fontSize: 26, fontWeight: '900', color: '#FF3B30', letterSpacing: 1, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', lineHeight: 24, marginBottom: 35 },
  
  blockBtn: { flexDirection: 'row', backgroundColor: '#FF3B30', width: '100%', paddingVertical: 18, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  blockBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800', marginLeft: 10 },
  
  reportBtn: { flexDirection: 'row', backgroundColor: '#0A84FF', width: '100%', paddingVertical: 18, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  reportBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800', marginLeft: 10 },
  
  continueBtn: { paddingVertical: 10 },
  continueBtnText: { color: '#8E8E93', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' },

  processingBox: { padding: 50, alignItems: 'center', justifyContent: 'center' },
  processingText: { color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 25, textAlign: 'center', lineHeight: 26 },
});
