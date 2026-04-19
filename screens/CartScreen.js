import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import { cartItems as cartItemsData, getProductById, getProductImage } from '../data';

export default function CartScreen({ navigation }) {
  const [items, setItems] = useState(
    cartItemsData
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean)
  );

  const updateQuantity = (id, delta) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={getProductImage(item.imageKey)} style={styles.itemImage} resizeMode="contain" />

            <View style={styles.itemBody}>
              <View style={styles.itemTopRow}>
                <View style={styles.itemTextWrap}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => removeItem(item.id)}>
                  <Text style={styles.removeIcon}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.itemBottomRow}>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Text style={styles.quantityIcon}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityValue}>{item.quantity}</Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text style={[styles.quantityIcon, styles.plusIcon]}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.85} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomNav active="Cart" navigation={navigation} />
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
  list: {
    paddingBottom: 208,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 18,
  },
  itemBody: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  itemTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  removeIcon: {
    fontSize: 22,
    color: '#B3B3B3',
    lineHeight: 22,
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityIcon: {
    fontSize: 24,
    color: '#B3B3B3',
    lineHeight: 24,
  },
  plusIcon: {
    color: '#53B175',
  },
  quantityValue: {
    width: 34,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 98,
  },
  checkoutButton: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    minHeight: 67,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  totalBadge: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#489E67',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  totalBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
