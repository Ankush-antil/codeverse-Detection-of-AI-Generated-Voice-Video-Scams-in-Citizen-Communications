import React, { useState, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, StatusBar,
  FlatList, Dimensions, Animated
} from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../store/authSlice';
import { RootState, AppDispatch } from '../store';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const SLIDES = [
  {
    key: '1',
    title: 'Deepfake Threat',
    desc: '85% of people cannot detect AI-generated voices. ₹1,750 Crore lost to voice scams in 2024.',
    icon: 'alert-octagon' as const,
    iconColor: '#FF3B4E',
    bgColor: 'rgba(255,59,78,0.18)',
  },
  {
    key: '2',
    title: 'AI RAKSHAK\nProtection',
    desc: 'Real-time voice & video detection with 97%+ accuracy. Works offline, supports 11 languages.',
    icon: 'shield-check' as const,
    iconColor: '#00D4FF',
    bgColor: 'rgba(0,212,255,0.15)',
  },
  {
    key: '3',
    title: 'Stay Protected',
    desc: 'Analyze calls, videos & protect your family from AI scams. Block suspicious content instantly.',
    icon: 'account-group' as const,
    iconColor: '#34C759',
    bgColor: 'rgba(52,199,89,0.15)',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const language = useSelector((state: RootState) => state.settings.language);

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Register' as any);
    }
  };

  const handleSkip = () => {
    navigation.replace('Register' as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1119" />

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(idx);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Icon Circle */}
            <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
              <MaterialCommunityIcons name={item.icon} size={90} color={item.iconColor} />
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex
                ? styles.dotActive
                : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Next / Get Started */}
      <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
        <Text style={styles.nextText}>
          {currentIndex < SLIDES.length - 1 ? 'Next' : 'Get Started'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1119',
    alignItems: 'center',
    paddingBottom: 50,
  },

  skipBtn: {
    alignSelf: 'flex-end',
    paddingTop: 60,
    paddingRight: 28,
    marginBottom: 10,
  },
  skipText: {
    color: '#8A9BB5',
    fontSize: 16,
    fontWeight: '500',
  },

  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1,
  },

  iconCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
    lineHeight: 36,
  },

  desc: {
    fontSize: 17,
    color: '#8A9BB5',
    textAlign: 'center',
    lineHeight: 26,
  },

  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#00D4FF',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#3A4560',
  },

  nextBtn: {
    backgroundColor: '#00D4FF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 60,
  },
  nextText: {
    color: '#0E1119',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
