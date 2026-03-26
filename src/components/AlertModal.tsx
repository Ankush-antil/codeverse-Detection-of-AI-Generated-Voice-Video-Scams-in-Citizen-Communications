import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Button, useTheme } from 'react-native-paper';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  alertData: { title: string; type: string; risk: string } | null;
};

export default function AlertModal({ visible, onDismiss, alertData }: Props) {
  const theme = useTheme();

  if (!alertData) return null;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modalStyle, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.error }]}>SECURITY ALERT</Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>{alertData.title}</Text>
        <View style={styles.details}>
          <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 16 }}>Type: {alertData.type}</Text>
          <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 16, marginTop: 5 }}>Risk Level: {alertData.risk}</Text>
        </View>
        <View style={styles.actions}>
          <Button mode="contained" buttonColor={theme.colors.error} onPress={onDismiss} style={styles.btn}>Block Sender</Button>
          <Button mode="outlined" onPress={onDismiss} style={styles.btn}>Report to Cyber Cell</Button>
          <Button mode="text" onPress={onDismiss}>Dismiss Warning</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalStyle: { padding: 20, margin: 20, borderRadius: 12, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  subtitle: { fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: '500' },
  details: { width: '100%', marginBottom: 25, padding: 15, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8 },
  actions: { width: '100%', gap: 10 },
  btn: { marginBottom: 10 },
});
