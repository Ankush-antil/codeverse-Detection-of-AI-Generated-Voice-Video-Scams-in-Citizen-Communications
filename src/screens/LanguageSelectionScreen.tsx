import React from 'react';
import {
  View, StyleSheet, TouchableOpacity,
  FlatList, StatusBar, SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLanguage } from '../store/settingsSlice';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LanguageSelection'>;
};

export default function LanguageSelectionScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isRegistered = useSelector((state: RootState) => state.auth.isRegistered);

  const handleSelect = (code: string) => {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
    if (isRegistered) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Main');
      }
    } else {
      navigation.replace('Onboarding');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1119" />

      {!isRegistered && (
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your{'\n'}Language</Text>
          <Text style={styles.subtitle}>Select your preferred language</Text>
        </View>
      )}
      
      {isRegistered && <View style={{ height: 20 }} />}

      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.langCard}
            onPress={() => handleSelect(item.code)}
            activeOpacity={0.7}
          >
            <Text style={styles.langName}>{item.name}</Text>
            <Text style={styles.langNative}>{item.native}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1119',
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 50,
    paddingBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 42,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8A9BB5',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  langCard: {
    backgroundColor: '#181E2E',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#232D42',
  },
  langName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  langNative: {
    fontSize: 16,
    color: '#00D4FF',
    fontWeight: '700',
  },
});
