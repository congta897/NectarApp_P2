import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { saveAuthToken, saveAuthUser } from '../services/storageService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập email và password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = `nectar-token-${Date.now()}`;
      const user = {
        email: email.trim(),
        loginAt: new Date().toISOString(),
      };

      await saveAuthToken(token);
      await saveAuthUser(user);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      Alert.alert('Đăng nhập thất bại', message || 'Không thể lưu dữ liệu đăng nhập. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/CaRot.png')}
          style={styles.carrotLogo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Loging</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="••••••••••"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        <Text style={styles.loginButtonText}>{isSubmitting ? 'Logging in...' : 'Log In'}</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Singup
          </Text>
        </Text>
      </View>

      <View style={styles.centerContainer}>
        <Text style={styles.userInfo}>Tạ Thành Công - 23810310268</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  carrotLogo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 35,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  eyeIcon: {
    fontSize: 22,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#53B175',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#53B175',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 15,
    color: '#666',
  },
  signupLink: {
    color: '#53B175',
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

