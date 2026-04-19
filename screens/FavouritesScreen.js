import React from 'react';
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
import {
  favouriteProductIds,
  formatPrice,
  getProductImage,
  getProductsByIds,
  matchesProductSearch,
} from '../data';

export default function FavouritesScreen({ navigation, route }) {
  const title = route.params?.title || 'Favourite';
  const filterQuery = route.params?.initialQuery || '';
  const favourites = getProductsByIds(favouriteProductIds).filter((item) =>
    matchesProductSearch(item, filterQuery)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {favourites.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.itemRow}>
            <Image source={getProductImage(item.imageKey)} style={styles.itemImage} resizeMode="contain" />

            <View style={styles.itemTextWrap}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>

            <View style={styles.itemRight}>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              <Text style={styles.chevron}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {!favourites.length ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No favourites found</Text>
            <Text style={styles.emptySubtitle}>Try another filter.</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addAllButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      <BottomNav active="Favourite" navigation={navigation} />
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
  emptyState: {
    paddingHorizontal: 20,
    paddingTop: 40,
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  itemImage: {
    width: 34,
    height: 52,
    marginRight: 18,
  },
  itemTextWrap: {
    flex: 1,
    paddingRight: 16,
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
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginRight: 12,
  },
  chevron: {
    fontSize: 18,
    color: '#181725',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 98,
  },
  addAllButton: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    minHeight: 67,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAllText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
