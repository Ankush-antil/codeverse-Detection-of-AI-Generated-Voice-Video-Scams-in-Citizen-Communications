import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../store/authSlice';
import { AppDispatch, RootState } from '../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.settings.language);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [loading, setLoading] = useState(false);

  // Auto-focused reference can be useful for OTP, but we will rely on autoComplete

  const handleSendOtp = () => {
    if (!name.trim() || !mobile.trim() || mobile.length < 10) {
      Alert.alert('Invalid Details', 'Please enter a valid name and mobile number.');
      return;
    }
    setLoading(true);
    // Simulate API call for sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
      Alert.alert('OTP Sent', 'An OTP has been sent to your mobile number. (Hint: Use 1234)');
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (otp !== '1234') {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
      return;
    }

    setLoading(true);
    try {
      // Actually register the user in the backend
      const resultAction = await dispatch(registerUserAsync({ name, mobile, language }));
      
      if (registerUserAsync.fulfilled.match(resultAction)) {
        Alert.alert('Registration Successful', 'Welcome to AI RAKSHAK! \nYour data has been successfully stored.', [
          { text: 'OK' }
        ]);
      } else {
        Alert.alert('Registration Note', 'Saved locally but could not connect to server.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="shield-account" size={80} color="#00D4FF" />
          <Text style={styles.title}>Welcome to AI RAKSHAK</Text>
          <Text style={styles.subtitle}>Create your secure account to continue</Text>
        </View>

        {step === 'DETAILS' ? (
          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { background: '#1A2138', primary: '#00D4FF', text: '#FFF' } }}
              textColor="#FFF"
              left={<TextInput.Icon icon="account" color="#8A9BB5" />}
            />
            
            <TextInput
              label="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              mode="outlined"
              keyboardType="phone-pad"
              maxLength={15}
              style={styles.input}
              theme={{ colors: { background: '#1A2138', primary: '#00D4FF', text: '#FFF' } }}
              textColor="#FFF"
              left={<TextInput.Icon icon="phone" color="#8A9BB5" />}
            />

            <TouchableOpacity 
              style={[styles.button, (!name || !mobile) && styles.buttonDisabled]} 
              onPress={handleSendOtp}
              disabled={loading || !name || !mobile}
            >
              {loading ? <ActivityIndicator color="#0E1119" /> : <Text style={styles.buttonText}>Send OTP</Text>}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.otpHeader}>
              <MaterialCommunityIcons name="message-processing-outline" size={40} color="#34C759" />
              <Text style={styles.otpInstructions}>
                Enter the OTP sent to {mobile}
              </Text>
            </View>

            <TextInput
              label="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              mode="outlined"
              keyboardType="number-pad"
              textContentType="oneTimeCode" // iOS Autofill
              autoComplete="sms-otp" // Android Autofill
              maxLength={6}
              style={styles.input}
              theme={{ colors: { background: '#1A2138', primary: '#34C759', text: '#FFF' } }}
              textColor="#FFF"
              left={<TextInput.Icon icon="lock" color="#8A9BB5" />}
            />

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#34C759' }, (!otp) && styles.buttonDisabled]} 
              onPress={handleVerifyOtp}
              disabled={loading || !otp}
            >
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Verify & Register</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setStep('DETAILS')} style={{ marginTop: 20 }}>
              <Text style={{ color: '#8A9BB5', textAlign: 'center' }}>Back to edit details</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1119',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A9BB5',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#1A2138',
  },
  button: {
    backgroundColor: '#00D4FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0E1119',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  otpInstructions: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  }
});
