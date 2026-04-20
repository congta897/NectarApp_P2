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

export default function ProductDetailScreen({ navigation }) {
  const handleAddToCart = async () => {
    try {
      await addToCart('apple', 1);
      Alert.alert('Đã thêm', 'Sản phẩm đã được thêm vào giỏ hàng.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F3F2" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.shareIcon}>↗</Text>
          </View>

          <Image
            // Thay ảnh quả táo chi tiết tại đây.
            source={require('../assets/apple.png')}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Natural Red Apple</Text>
              <Text style={styles.subtitle}>1kg, Price</Text>
            </View>
            <Text style={styles.heart}>♡</Text>
          </View>

          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.qtyButton}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <View style={styles.qtyBox}>
              <Text style={styles.qtyValue}>1</Text>
            </View>
            <TouchableOpacity style={styles.qtyButton}>
              <Text style={[styles.qtyText, styles.greenText]}>+</Text>
            </TouchableOpacity>
            <Text style={styles.price}>$4.99</Text>
          </View>

          <View style={styles.divider} />

          <InfoRow
            title="Product Detail"
            value="Apple Are Nutritious. Apples May Be Good For Weight Loss. Apple May Be Good For Your Heart. As Part Of A Healthful And Varied Diet."
          />
          <InfoRow title="Nutritions" badge="100gr" />
          <InfoRow title="Review" stars="★★★★★" />

          <TouchableOpacity style={styles.basketButton} onPress={handleAddToCart}>
            <Text style={styles.basketText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ title, value, badge, stars }) {
  return (
    <View style={styles.infoBlock}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle}>{title}</Text>
        <View style={styles.infoRight}>
          {badge ? <Text style={styles.badge}>{badge}</Text> : null}
          {stars ? <Text style={styles.stars}>{stars}</Text> : null}
          <Text style={styles.chevron}>{'>'}</Text>
        </View>
      </View>
      {value ? <Text style={styles.infoValue}>{value}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    paddingTop: 46,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 26,
    color: '#181725',
    fontWeight: '700',
  },
  shareIcon: {
    fontSize: 20,
    color: '#181725',
  },
  productImage: {
    width: '100%',
    height: 220,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181725',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  heart: {
    fontSize: 22,
    color: '#7C7C7C',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  qtyButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  qtyText: {
    fontSize: 24,
    color: '#B3B3B3',
  },
  greenText: {
    color: '#53B175',
  },
  qtyBox: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  price: {
    marginLeft: 'auto',
    fontSize: 24,
    fontWeight: '700',
    color: '#181725',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginBottom: 12,
  },
  infoBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 18,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },
  infoRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#7C7C7C',
  },
  badge: {
    backgroundColor: '#EBEBEB',
    color: '#7C7C7C',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  stars: {
    color: '#F3603F',
    letterSpacing: 1,
    marginRight: 10,
  },
  chevron: {
    fontSize: 18,
    color: '#181725',
  },
  basketButton: {
    marginTop: 28,
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
  },
  basketText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
