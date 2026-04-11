import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#53B175" />
      <Image source={require('../assets/Splash.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logo: { width: width * 0.45, height: width * 0.45, marginBottom: 20 },
  title: { fontSize: 58, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 16, color: '#ffffffcc', marginTop: 8 },
});