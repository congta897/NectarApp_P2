import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import { addToCart } from '../services/storageService';
import {
  formatPrice,
  getProductImage,
  matchesProductSearch,
  products,
} from '../data';

export default function ExploreScreen({ navigation, route }) {
  const title = route.params?.title || 'Search';
  const incomingQuery = route.params?.initialQuery;
  const activeFilterId = route.params?.activeFilterId || null;
  const activeFilterGroup = route.params?.activeFilterGroup || null;
  const [query, setQuery] = useState(typeof incomingQuery === 'string' ? incomingQuery : '');

  useEffect(() => {
    setQuery(typeof incomingQuery === 'string' ? incomingQuery : '');
  }, [incomingQuery]);

  const filteredProducts = products.filter((item) => matchesProductSearch(item, query));

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
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            style={styles.searchInput}
          />
          {query ? (
            <TouchableOpacity activeOpacity={0.8} style={styles.clearButton} onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.filterButton}
          onPress={() =>
            navigation.navigate('Filters', {
              sourceScreen: 'Explore',
              activeFilterId,
              activeFilterGroup,
            })
          }
        >
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {filteredProducts.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => item.detailRoute && navigation.navigate(item.detailRoute)}
          >
            <Image source={getProductImage(item.imageKey)} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => handleAddToCart(item.id)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {!filteredProducts.length ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Khong tim thay san pham</Text>
            <Text style={styles.emptySubtitle}>Thu tim voi tu khoa khac.</Text>
          </View>
        ) : null}
      </ScrollView>

      <BottomNav active="Explore" navigation={navigation} />
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
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
  },
  searchRow: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
    color: '#181725',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#181725',
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 12,
    color: '#7C7C7C',
    lineHeight: 12,
    fontWeight: '700',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F2F3F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  filterIcon: {
    fontSize: 18,
    color: '#181725',
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 110,
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
    minHeight: 40,
    marginBottom: 4,
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
  emptyState: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7C7C7C',
  },
});
