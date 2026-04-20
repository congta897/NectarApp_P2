import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToCart } from '../services/storageService';
import { beverageProductIds, formatPrice, getProductImage, getProductsByIds } from '../data';

export default function BeveragesScreen({ navigation }) {
  const beverages = getProductsByIds(beverageProductIds);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      Alert.alert('Đã thêm', 'Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Beverages</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Filters', { sourceScreen: 'Beverages' })}
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {beverages.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={getProductImage(item.imageKey)} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => handleAddToCart(item.id)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 26,
    color: '#181725',
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
  },
  filterIcon: {
    fontSize: 22,
    color: '#181725',
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47.2%',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 14,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 92,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 4,
    minHeight: 40,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    lineHeight: 26,
    color: '#FFFFFF',
  },
});
