import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/nguoi dan ong cam rau.png')} 
        style={styles.fullImage} 
        resizeMode="cover" 
      />
      <View style={styles.overlay} />

      <View style={styles.textContainer}>
        <Image source={require('../assets/CaRot trắng.png')} style={{ width: 50, height: 50, marginBottom: 20 }} resizeMode="contain" />
        <Text style={styles.title}>Welcome to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullImage: { position: 'absolute', width: '100%', height: '100%' },
  overlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.40)' },
  textContainer: { flex: 1, justifyContent: 'flex-end', padding: 30, paddingBottom: 80, alignItems: 'center' },
  title: { fontSize: 60, color: '#fff', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 17, color: '#ffffffdd', textAlign: 'center', lineHeight: 26, marginBottom: 50 },
  button: { backgroundColor: '#53B175', paddingVertical: 18, paddingHorizontal: 90, borderRadius: 14 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});