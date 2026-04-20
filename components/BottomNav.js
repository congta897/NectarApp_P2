import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const navItems = [
  { label: 'Shop', icon: '⌂', route: 'Home' },
  {
    label: 'Explore',
    icon: '⌕',
    route: 'Explore',
    params: { initialQuery: '', title: 'Search', activeFilterId: null, activeFilterGroup: null },
  },
  { label: 'Cart', icon: '🛒', route: 'Cart' },
  {
    label: 'Favourite',
    icon: '♡',
    route: 'Favourites',
    params: { initialQuery: '', title: 'Favourite', activeFilterId: null, activeFilterGroup: null },
  },
  { label: 'Account', icon: '☺', route: 'Account' },
];

export default function BottomNav({ active, navigation }) {
  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = active === item.label;

        return (
          <TouchableOpacity
            key={item.label}
            activeOpacity={item.route ? 0.8 : 1}
            onPress={() => {
              if (item.route && !isActive) {
                navigation.navigate(item.route, item.params);
              }
            }}
            style={styles.navItem}
          >
            <Text style={[styles.navIcon, isActive && styles.navActive]}>{item.icon}</Text>
            <Text style={[styles.navLabel, isActive && styles.navActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
