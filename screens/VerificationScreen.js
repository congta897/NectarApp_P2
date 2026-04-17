// screens/VerificationScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';

export default function VerificationScreen({ navigation }) {
  const [otp, setOtp] = useState('');

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
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.subtitle}>Code sent to your mobile number</Text>

        <TextInput
          style={styles.otpInput}
          placeholder="----"
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
          textAlign="center"
        />

        <TouchableOpacity 
          style={[styles.button, otp.length < 4 && styles.disabled]}
          disabled={otp.length < 4}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.userInfo}>
            Nguyễn Mạnh Toàn - 23810310262
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingTop: 50 },
  back: { fontSize: 28, color: '#53B175' },
  content: { flex: 1, paddingHorizontal: 25, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 40, textAlign: 'center' },
  otpInput: { 
    fontSize: 36, 
    letterSpacing: 25, 
    borderBottomWidth: 2, 
    borderBottomColor: '#53B175', 
    width: 200, 
    textAlign: 'center',
    marginVertical: 50 
  },
  button: { 
    backgroundColor: '#53B175', 
    paddingVertical: 18, 
    borderRadius: 14, 
    width: '100%' 
  },
  disabled: { backgroundColor: '#cccccc' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  resend: { color: '#53B175', textAlign: 'center', marginTop: 30 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },   
  userInfo: { fontSize: 16, color: '#999' },
});