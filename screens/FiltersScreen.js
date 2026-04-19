import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const categoryFilters = [
  { id: 'eggs', label: 'Eggs', query: 'egg', screen: 'Explore', group: 'category' },
  { id: 'noodles', label: 'Noodles & Pasta', query: 'noodles pasta', screen: 'Explore', group: 'category' },
  { id: 'chips', label: 'Chips & Crisps', query: 'chips crisps', screen: 'Explore', group: 'category' },
  { id: 'fast-food', label: 'Fast Food', query: 'fast food', screen: 'Explore', group: 'category' },
];

const brandFilters = [
  {
    id: 'individual',
    label: 'Individual Collection',
    query: 'individual collection',
    screen: 'Favourites',
    group: 'brand',
  },
  { id: 'cocola', label: 'Cocola', query: 'beverage', screen: 'Favourites', group: 'brand' },
  { id: 'ifad', label: 'Ifad', query: 'ifad', screen: 'Favourites', group: 'brand' },
  { id: 'kazi', label: 'Kazi Farms', query: 'kazi farms', screen: 'Favourites', group: 'brand' },
];

function buildFilterOptions(filters, activeId) {
  return filters.map((item) => ({
    ...item,
    selected: item.id === activeId,
  }));
}

export default function FiltersScreen({ navigation, route }) {
  const activeFilterId = route.params?.activeFilterId || null;
  const activeFilterGroup = route.params?.activeFilterGroup || null;
  const sourceScreen = route.params?.sourceScreen || null;

  const [categories, setCategories] = useState(() =>
    buildFilterOptions(categoryFilters, activeFilterGroup === 'category' ? activeFilterId : null)
  );
  const [brands, setBrands] = useState(() =>
    buildFilterOptions(brandFilters, activeFilterGroup === 'brand' ? activeFilterId : null)
  );

  useEffect(() => {
    setCategories(buildFilterOptions(categoryFilters, activeFilterGroup === 'category' ? activeFilterId : null));
    setBrands(buildFilterOptions(brandFilters, activeFilterGroup === 'brand' ? activeFilterId : null));
  }, [activeFilterGroup, activeFilterId]);

  const toggleOption = (id, group) => {
    if (group === 'category') {
      setCategories((current) =>
        current.map((item) => ({
          ...item,
          selected: item.id === id ? !item.selected : false,
        }))
      );
      setBrands((current) => current.map((item) => ({ ...item, selected: false })));
      return;
    }

    setBrands((current) =>
      current.map((item) => ({
        ...item,
        selected: item.id === id ? !item.selected : false,
      }))
    );
    setCategories((current) => current.map((item) => ({ ...item, selected: false })));
  };

  const openFilteredScreen = (screen, params) => {
    if (typeof navigation.popTo === 'function') {
      navigation.popTo(screen, params, { merge: true });
      return;
    }

    navigation.navigate(screen, params);
  };

  const clearCurrentFilter = () => {
    if (sourceScreen === 'Explore') {
      openFilteredScreen('Explore', {
        initialQuery: '',
        title: 'Search',
        activeFilterId: null,
        activeFilterGroup: null,
      });
      return;
    }

    if (sourceScreen === 'Favourites') {
      openFilteredScreen('Favourites', {
        initialQuery: '',
        title: 'Favourite',
        activeFilterId: null,
        activeFilterGroup: null,
      });
      return;
    }

    navigation.goBack();
  };

  const handleApplyFilter = () => {
    const selectedCategory = categories.find((item) => item.selected);
    const selectedBrand = brands.find((item) => item.selected);
    const selectedFilter = selectedCategory || selectedBrand;

    if (!selectedFilter) {
      clearCurrentFilter();
      return;
    }

    openFilteredScreen(selectedFilter.screen, {
      initialQuery: selectedFilter.query,
      title: selectedFilter.label,
      activeFilterId: selectedFilter.id,
      activeFilterGroup: selectedFilter.group,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.closeIcon}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.panel}>
        <FilterSection
          title="Categories"
          options={categories}
          onToggle={(id) => toggleOption(id, 'category')}
        />

        <FilterSection
          title="Brand"
          options={brands}
          onToggle={(id) => toggleOption(id, 'brand')}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.applyButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FilterSection({ title, options, onToggle }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {options.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.optionRow}
          onPress={() => onToggle(item.id)}
        >
          <View style={[styles.checkbox, item.selected && styles.checkboxActive]}>
            {item.selected ? <Text style={styles.checkmark}>v</Text> : null}
          </View>
          <Text style={[styles.optionLabel, item.selected && styles.optionLabelActive]}>
            {item.label}
          </Text>
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
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeIcon: {
    fontSize: 28,
    color: '#181725',
    lineHeight: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
  },
  headerSpacer: {
    width: 28,
  },
  panel: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 18,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B1B1B1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxActive: {
    backgroundColor: '#53B175',
    borderColor: '#53B175',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  optionLabel: {
    fontSize: 16,
    color: '#181725',
  },
  optionLabelActive: {
    color: '#53B175',
    fontWeight: '600',
  },
  applyButton: {
    marginTop: 'auto',
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
