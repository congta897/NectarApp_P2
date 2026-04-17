// screens/SignInScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Ảnh rau củ quả trên top */}
      <Image 
        source={require('../assets/raucuqua.png')} 
        style={styles.topImage} 
        resizeMode="full" 
      />

      <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

      {/* Phần nhập số điện thoại - Bấm vào chuyển sang Number */}
      <TouchableOpacity 
        style={styles.phoneContainer}
        onPress={() => navigation.navigate('Number')}
      >
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>🇻🇳</Text>
        </View>
        <Text style={styles.countryCode}>+84</Text>
        <Text style={styles.phonePlaceholder}>Enter your phone number</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or connect with social media</Text>

      {/* Nút Google */}
      <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Continue with Google')}>
        <Image 
          source={require('../assets/logoGG.png')} 
          style={styles.socialIcon} 
          resizeMode="contain" 
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Nút Facebook */}
      <TouchableOpacity style={styles.facebookButton} onPress={() => console.log('Continue with Facebook')}>
        <Image 
          source={require('../assets/logoFB.png')} 
          style={styles.socialIcon} 
          resizeMode="contain" 
        />
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <View style={styles.centerContainer}>
          <Text style={styles.userInfo}>
            Nguyễn Mạnh Toàn - 23810310262
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
    paddingTop: 40,
  },
  topImage: {
    width: '100%',
    height: 280,
    marginBottom: 30,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 40,
  },

  // Phần nhập số điện thoại
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  flagContainer: {
    marginRight: 12,
  },
  flag: {
    fontSize: 24,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 12,
  },
  phonePlaceholder: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },

  orText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
    fontSize: 15,
  },

  // Nút Google
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
  },

  // Nút Facebook
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
  },

  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
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
