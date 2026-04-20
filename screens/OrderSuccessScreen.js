import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderSuccessScreen({ navigation, route }) {
  const total = route.params?.total ?? 0;
  const orderId = route.params?.orderId ?? '';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.card}>
        <View style={styles.checkmarkWrapper}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.subtitle}>Mã đơn hàng: {orderId}</Text>
        <Text style={styles.total}>Tổng thanh toán: ${Number(total).toFixed(2)}</Text>
        <Text style={styles.description}>
          Cám ơn bạn đã đặt hàng. Đơn hàng của bạn đã được lưu và sẽ được xử lý ngay.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        >
          <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#F8FFF4',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 12,
  },
  checkmarkWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF8EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 60,
    color: '#53B175',
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181725',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#53B175',
    marginBottom: 6,
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 18,
  },
  description: {
    color: '#7C7C7C',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#53B175',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#53B175',
  },
  secondaryButtonText: {
    color: '#53B175',
  },
});