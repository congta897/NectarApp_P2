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
import BottomNav from '../components/BottomNav';

const exclusiveOffers = [
  {
    id: 'banana',
    title: 'Organic Bananas',
    subtitle: '7pcs, Priceg',
    price: '$4.99',
    image: require('../assets/banana.png'),
  },
  {
    id: 'apple',
    title: 'Red Apple',
    subtitle: '1kg, Priceg',
    price: '$4.99',
    image: require('../assets/apple.png'),
    onPress: 'ProductDetail',
  },
];

const bestSelling = [
  {
    id: 'pepper',
    title: 'Bell Pepper Red',
    subtitle: '1kg, Priceg',
    price: '$4.99',
    image: require('../assets/ớt chuông.png'),
  },
  {
    id: 'ginger',
    title: 'Ginger',
    subtitle: '250gm, Priceg',
    price: '$4.99',
    image: require('../assets/gừng.png'),
  },
];

const groceries = [
  {
    id: 'pulses',
    title: 'Pulses',
    image: require('../assets/các loại hạt.png'),
    backgroundColor: '#F8E8D8',
  },
  {
    id: 'rice',
    title: 'Rice',
    image: require('../assets/gạo.png'),
    backgroundColor: '#E8F2E3',
  },
];

const meats = [
  {
    id: 'beef',
    title: 'Beef Bone',
    subtitle: '1kg, Priceg',
    price: '$4.99',
    image: require('../assets/thịt bò.png'),
  },
  {
    id: 'chicken',
    title: 'Broiler Chicken',
    subtitle: '1kg, Priceg',
    price: '$4.99',
    image: require('../assets/thịt gà.png'),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/CaRot.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.location}>Dhaka, Banassre</Text>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.heroCard}>
          <Image
            source={require('../assets/raucuqua.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Fresh Vegetables</Text>
            <Text style={styles.heroSubtitle}>Get Up To 40% OFF</Text>
          </View>
        </View>

        <SectionHeader title="Exclusive Offer" />
        <View style={styles.cardRow}>
          {exclusiveOffers.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={() => item.onPress && navigation.navigate(item.onPress)}
            />
          ))}
        </View>

        <SectionHeader title="Best Selling" />
        <View style={styles.cardRow}>
          {bestSelling.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>

        <SectionHeader title="Groceries" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groceryRow}
        >
          {groceries.map((item) => (
            <View key={item.id} style={[styles.groceryCard, { backgroundColor: item.backgroundColor }]}>
              <Image source={item.image} style={styles.groceryImage} resizeMode="contain" />
              <Text style={styles.groceryTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.cardRow}>
          {meats.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <BottomNav active="Shop" navigation={navigation} />
    </View>
  );
}

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeAll}>See all</Text>
    </View>
  );
}

function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.productCard} onPress={onPress}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity activeOpacity={0.85} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingTop: 44,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 26,
    height: 32,
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C4F4D',
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
  heroCard: {
    marginHorizontal: 20,
    backgroundColor: '#EEF7F1',
    borderRadius: 18,
    minHeight: 120,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  heroImage: {
    width: 110,
    height: 86,
  },
  heroTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#030303',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#181725',
  },
  seeAll: {
    fontSize: 16,
    color: '#53B175',
    fontWeight: '600',
  },
  cardRow: {
    paddingHorizontal: 20,
    marginBottom: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47.5%',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 14,
  },
  productImage: {
    width: '100%',
    height: 78,
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 4,
  },
  productSubtitle: {
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
  groceryRow: {
    paddingLeft: 20,
    paddingRight: 8,
    marginBottom: 22,
  },
  groceryCard: {
    width: 170,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groceryImage: {
    width: 52,
    height: 52,
    marginRight: 14,
  },
  groceryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3E423F',
  },
});
