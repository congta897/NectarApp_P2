import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  {
    id: 'frash-fruits',
    title: 'Frash Fruits\n& Vegetable',
    image: require('../assets/rau cu.png'),
    backgroundColor: '#EEF7F1',
    borderColor: '#C4E3CC',
  },
  {
    id: 'oil',
    title: 'Cooking Oil\n& Ghee',
    image: require('../assets/dầu.png'),
    backgroundColor: '#FFF8E5',
    borderColor: '#F2D9A5',
  },
  {
    id: 'meat',
    title: 'Meat & Fish',
    image: require('../assets/thịt.png'),
    backgroundColor: '#FDEDED',
    borderColor: '#E9C2C2',
  },
  {
    id: 'bakery',
    title: 'Bakery & Snacks',
    image: require('../assets/bánh.png'),
    backgroundColor: '#FFF5E7',
    borderColor: '#F3D6A6',
  },
  {
    id: 'dairy',
    title: 'Dairy & Eggs',
    image: require('../assets/trứng.png'),
    backgroundColor: '#F1F6FF',
    borderColor: '#C8D6F0',
  },
  {
    id: 'beverages',
    title: 'Beverages',
    image: require('../assets/nước.png'),
    backgroundColor: '#FEF0F7',
    borderColor: '#E6B8CF',
    onPress: 'Beverages',
  },
];

export default function ExploreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.title}>Find Products</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={[styles.card, { backgroundColor: item.backgroundColor, borderColor: item.borderColor }]}
            onPress={() => item.onPress && navigation.navigate(item.onPress)}
          >
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav active="Explore" onHomePress={() => navigation.navigate('Home')} />
    </View>
  );
}

function BottomNav({ active, onHomePress }) {
  const items = [
    { label: 'Shop', icon: '⌂', onPress: onHomePress },
    { label: 'Explore', icon: '⌕' },
    { label: 'Cart', icon: '🛒' },
    { label: 'Favourite', icon: '♡' },
    { label: 'Account', icon: '☺' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <TouchableOpacity key={item.label} style={styles.navItem} onPress={item.onPress} activeOpacity={0.8}>
          <Text style={[styles.navIcon, active === item.label && styles.navActive]}>{item.icon}</Text>
          <Text style={[styles.navLabel, active === item.label && styles.navActive]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
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
  searchBox: {
    marginHorizontal: 20,
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
    color: '#181B19',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
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
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: 74,
    height: 74,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#181725',
    lineHeight: 22,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 14,
    paddingBottom: 26,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 12,
  },
  navItem: {
    alignItems: 'center',
    width: 68,
  },
  navIcon: {
    fontSize: 18,
    color: '#181725',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#181725',
  },
  navActive: {
    color: '#53B175',
    fontWeight: '700',
  },
});
