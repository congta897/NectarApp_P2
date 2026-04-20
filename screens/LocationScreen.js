// screens/LocationScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';

export default function LocationScreen({ navigation }) {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('Types of your area');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* NÃºt Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* áº¢nh Map trÃªn Ä‘á»‰nh */}
      <Image 
        source={require('../assets/map.png')} 
        style={styles.mapImage} 
        resizeMode="contain" 
      />

      <Text style={styles.title}>Select Your Location</Text>
      <Text style={styles.subtitle}>
        Switch on your location to stay in tune with what's happening in your area
      </Text>

      {/* Your Zone */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Your Zone</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{zone}</Text>
          <Text style={styles.dropdownArrow}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* Your Area */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Your Area</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{area}</Text>
          <Text style={styles.dropdownArrow}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* NÃºt Submit */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.centerContainer}>
          <Text style={styles.userInfo}>
            Tạ Thành Công - 23810310268
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 28,
    color: '#53B175',
  },
  mapImage: {
    width: '100%',
    height: 220,
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  dropdownContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#999',
  },

  submitButton: {
    backgroundColor: '#53B175',
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
    userInfo: {
    fontSize: 14,
    color: '#999',
  },
  centerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

