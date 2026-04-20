import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getOrders } from '../services/storageService';

function formatOrderTime(isoTime) {
  try {
    return new Date(isoTime).toLocaleString();
  } catch (error) {
    return isoTime;
  }
}

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#53B175" />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.orderTime}>Placed: {formatOrderTime(item.placedAt)}</Text>
              <Text style={styles.orderTotal}>Total: ${Number(item.total || 0).toFixed(2)}</Text>

              <View style={styles.divider} />

              {Array.isArray(item.items)
                ? item.items.map((product) => (
                    <Text key={`${item.id}-${product.productId}`} style={styles.itemLine}>
                      - {product.title} x{product.quantity} (${(product.price * product.quantity).toFixed(2)})
                    </Text>
                  ))
                : null}
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptySubtitle}>Checkout from cart to create your first order.</Text>
            </View>
          }
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
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
  placeholder: {
    width: 20,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
    paddingBottom: 30,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181725',
    marginBottom: 6,
  },
  orderTime: {
    fontSize: 13,
    color: '#7C7C7C',
    marginBottom: 6,
  },
  orderTotal: {
    fontSize: 16,
    color: '#53B175',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 10,
  },
  itemLine: {
    fontSize: 13,
    color: '#181725',
    marginBottom: 4,
  },
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    color: '#181725',
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
  },
});
