import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import { getProductById, getProductImage } from '../data';
import {
  addOrder,
  clearCart,
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from '../services/storageService';

function hydrateCartItems(rawItems) {
  return rawItems
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
    .filter(Boolean);
}

export default function CartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCart = useCallback(async () => {
    try {
      const rawItems = await getCartItems();
      setItems(hydrateCartItems(rawItems));
    } catch (error) {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart])
  );

  const updateQuantity = async (id, delta) => {
    try {
      const current = items.find((item) => item.id === id);
      if (!current) {
        return;
      }

      const nextQuantity = Math.max(1, current.quantity + delta);
      const updatedRaw = await updateCartItemQuantity(id, nextQuantity);
      setItems(hydrateCartItems(updatedRaw));
    } catch (error) {
      Alert.alert('Error', 'Could not update quantity.');
    }
  };

  const removeItem = async (id) => {
    try {
      const updatedRaw = await removeFromCart(id);
      setItems(hydrateCartItems(updatedRaw));
    } catch (error) {
      Alert.alert('Error', 'Could not remove item.');
    }
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleCheckout = async () => {
    if (!items.length) {
      Alert.alert('Cart is empty', 'Please add products before checkout.');
      return;
    }

    try {
      const placedAt = new Date().toISOString();
      const order = {
        id: `order-${Date.now()}`,
        placedAt,
        total,
        items: items.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      await addOrder(order);
      await clearCart();
      setItems([]);
      navigation.navigate('OrderSuccess', { orderId: order.id, total });
    } catch (error) {
      Alert.alert('Checkout failed', 'Could not save your order.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        <TouchableOpacity style={styles.orderLink} onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.orderLinkText}>Orders</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#53B175" />
        </View>
      ) : (
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
                    <Text style={styles.removeIcon}>x</Text>
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

          {!items.length ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySubtitle}>Tap + on products to add to cart.</Text>
            </View>
          ) : null}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.checkoutButton, !items.length && styles.checkoutDisabled]}
          onPress={handleCheckout}
          disabled={!items.length}
        >
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
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
  },
  orderLink: {
    position: 'absolute',
    right: 20,
    bottom: 14,
  },
  orderLinkText: {
    color: '#53B175',
    fontSize: 14,
    fontWeight: '700',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyState: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181725',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
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
  checkoutDisabled: {
    backgroundColor: '#9ECFAC',
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
