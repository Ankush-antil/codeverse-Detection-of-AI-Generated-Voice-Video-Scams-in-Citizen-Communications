import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, useTheme, Button, List, Avatar, IconButton, Provider, Portal, Modal, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addMember, removeMember } from '../store/familySlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FamilyProtectionScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.family.members);
  
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleAddMember = () => {
    if (!name.trim() || mobile.length < 10) {
      Alert.alert('Invalid Details', 'Please enter a valid Name and a 10-digit Mobile Number.');
      return;
    }

    const existing = members.find(m => m.mobile === mobile);
    if (existing) {
      Alert.alert('Already Added', 'This mobile number is already in your family circle.');
      return;
    }

    dispatch(addMember({ name, mobile }));
    Alert.alert('Verified', `${name} has been verified on the AI-RAKSHAK network and added to your circle.`);
    setVisible(false);
    setName('');
    setMobile('');
  };

  const handleDelete = (id: string, memberName: string) => {
    Alert.alert('Remove Member', `Are you sure you want to remove ${memberName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => dispatch(removeMember(id)) }
    ]);
  };

  return (
    <Provider>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Family Circle</Text>
          <Button mode="contained" icon="plus" onPress={() => setVisible(true)} buttonColor={theme.colors.primary}>
            Add Family
          </Button>
        </View>

        <Text style={{ color: theme.colors.onSurfaceVariant, paddingHorizontal: 20, marginBottom: 25, fontSize: 15 }}>
          Add your family members using their registered mobile numbers to monitor their AI protection status.
        </Text>

        <FlatList
          data={members}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`Mobile: ${item.mobile} • Protected`}
              left={props => <Avatar.Icon {...props} icon="shield-account" size={50} style={{ backgroundColor: theme.colors.surface }} color="#34C759" />}
              right={props => (
                <IconButton 
                  {...props} 
                  icon="delete-outline" 
                  iconColor="#FF3B30" 
                  onPress={() => handleDelete(item.id, item.name)} 
                />
              )}
              style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
              titleStyle={{ color: theme.colors.onSurface, fontWeight: 'bold', fontSize: 18 }}
              descriptionStyle={{ color: '#8E8E93', marginTop: 4, fontWeight: '500' }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="account-group-outline" size={60} color="#2C2C2E" />
              <Text style={styles.emptyText}>You haven't added any family members yet.</Text>
            </View>
          }
        />

        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
            <Text style={styles.modalTitle}>Add Family Member</Text>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />
            <TextInput
              label="Registered Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              mode="outlined"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
              left={<TextInput.Icon icon="cellphone" />}
            />
            <Button mode="contained" onPress={handleAddMember} style={styles.modalBtn}>
              Verify & Add
            </Button>
            <Button mode="text" onPress={() => setVisible(false)} textColor="#FF3B30" style={{ marginTop: 10 }}>
              Cancel
            </Button>
          </Modal>
        </Portal>

      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 15, paddingTop: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  listItem: { borderRadius: 12, marginBottom: 15, padding: 8, elevation: 2, borderWidth: 1, borderColor: '#2C2C2E' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#8E8E93', fontSize: 16, marginTop: 15 },
  
  modal: { backgroundColor: '#1C1C1E', padding: 25, margin: 25, borderRadius: 20, borderWidth: 1, borderColor: '#2C2C2E' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 15, backgroundColor: '#000' },
  modalBtn: { marginTop: 10, borderRadius: 10, paddingVertical: 5 }
});
