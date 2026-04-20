import React from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import { logout } from '../services/storageService';

export default function AccountScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Account</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.menuText}>Orders</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favourites')}>
            <Text style={styles.menuText}>Favourites</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.menuText}>Cart</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.userInfo}>Tạ Thành Công - 23810310268</Text>
        </View>
      </ScrollView>

      <BottomNav active="Account" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 52,
    paddingBottom: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  menuText: {
    fontSize: 16,
    color: '#181725',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF0000',
  },
  chevron: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  centerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  userInfo: {
    fontSize: 14,
    color: '#999',
  },
});