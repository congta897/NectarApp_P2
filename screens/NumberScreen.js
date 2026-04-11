// screens/NumberScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';

export default function NumberScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>Mobile Number</Text>

        <View style={styles.inputContainer}>
          <View style={styles.flagContainer}>
                    <Text style={styles.flag}>🇻🇳</Text>
                  </View>
          <Text style={styles.countryCode}>+84</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, phone.length < 9 && styles.disabled]}
          disabled={phone.length < 9}
          onPress={() => navigation.navigate('Verification')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingTop: 50 },
  back: { fontSize: 28, color: '#53B175' },
  content: { flex: 1, paddingHorizontal: 25 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 40 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    paddingHorizontal: 15 
  },
  countryCode: { fontSize: 18, marginRight: 10, color: '#53B175' },
  input: { flex: 1, paddingVertical: 18, fontSize: 18 },
  button: { 
    backgroundColor: '#53B175', 
    paddingVertical: 18, 
    borderRadius: 14, 
    marginTop: 40 
  },
  disabled: { backgroundColor: '#cccccc' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});