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

const beverages = [
  {
    id: 'diet-coke',
    title: 'Diet Coke',
    subtitle: '355ml, Price',
    price: '$1.99',
    image: require('../assets/coke.png'),
  },
  {
    id: 'sprite',
    title: 'Sprite Can',
    subtitle: '325ml, Price',
    price: '$1.50',
    image: require('../assets/sprite.png'),
  },
  {
    id: 'apple-grape',
    title: 'Apple & Grape\nJuice',
    subtitle: '2L, Price',
    price: '$15.99',
    image: require('../assets/nước táo.png'),
  },
  {
    id: 'orange',
    title: 'Orange Juice',
    subtitle: '2L, Price',
    price: '$15.99',
    image: require('../assets/nước cam.png'),
  },
  {
    id: 'coca',
    title: 'Coca Cola Can',
    subtitle: '325ml, Price',
    price: '$4.99',
    image: require('../assets/coca.png'),
  },
  {
    id: 'pepsi',
    title: 'Pepsi Can',
    subtitle: '330ml, Price',
    price: '$4.99',
    image: require('../assets/pepsi.png'),
  },
];

export default function BeveragesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Beverages</Text>
        <Text style={styles.filterIcon}>≡</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {beverages.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              // Thay ảnh sản phẩm đồ uống của bạn tại đây.
              source={item.image}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity style={styles.addButton}>
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
