import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  authToken: 'nectar_auth_token',
  authUser: 'nectar_auth_user',
  cart: 'nectar_cart_items',
  orders: 'nectar_orders',
};

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && typeof item.productId === 'string')
    .map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, Number(item.quantity) || 1),
    }));
}

async function getCartItems() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.cart);
    if (!raw) {
      return [];
    }

    return normalizeCartItems(JSON.parse(raw));
  } catch (error) {
    return [];
  }
}

async function saveCartItems(items) {
  try {
    const normalized = normalizeCartItems(items);
    await AsyncStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(normalized));
    return normalized;
  } catch (error) {
    return [];
  }
}

async function addToCart(productId, quantity = 1) {
  try {
    const current = await getCartItems();
    const index = current.findIndex((item) => item.productId === productId);

    if (index >= 0) {
      current[index] = {
        ...current[index],
        quantity: current[index].quantity + Math.max(1, quantity),
      };
    } else {
      current.push({ productId, quantity: Math.max(1, quantity) });
    }

    return await saveCartItems(current);
  } catch (error) {
    return [];
  }
}

async function updateCartItemQuantity(productId, nextQuantity) {
  try {
    const current = await getCartItems();
    const updated = current
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Number(nextQuantity) || 1) }
          : item
      )
      .filter(Boolean);

    return await saveCartItems(updated);
  } catch (error) {
    return [];
  }
}

async function removeFromCart(productId) {
  try {
    const current = await getCartItems();
    const updated = current.filter((item) => item.productId !== productId);
    return await saveCartItems(updated);
  } catch (error) {
    return [];
  }
}

async function clearCart() {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([]));
    return [];
  } catch (error) {
    return [];
  }
}

async function getOrders() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.orders);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function saveOrders(orders) {
  try {
    const safeOrders = Array.isArray(orders) ? orders : [];
    await AsyncStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(safeOrders));
    return safeOrders;
  } catch (error) {
    return [];
  }
}

async function addOrder(order) {
  try {
    const current = await getOrders();
    const next = [order, ...current];
    return await saveOrders(next);
  } catch (error) {
    return [];
  }
}

// Authentication functions
async function saveAuthToken(token) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.authToken, token);
  } catch (error) {
    throw error instanceof Error ? error : new Error('Không thể lưu token xác thực');
  }
}

async function getAuthToken() {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.authToken);
  } catch (error) {
    console.error('getAuthToken error', error);
    return null;
  }
}

async function saveAuthUser(user) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  } catch (error) {
    throw error instanceof Error ? error : new Error('Không thể lưu thông tin người dùng');
  }
}

async function getAuthUser() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.authUser);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

async function logout() {
  try {
    const keysToRemove = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keysToRemove);
  } catch (error) {
    throw new Error('Không thể đăng xuất');
  }
}

export {
  addOrder,
  addToCart,
  clearCart,
  getAuthToken,
  getAuthUser,
  getCartItems,
  getOrders,
  logout,
  removeFromCart,
  saveAuthToken,
  saveAuthUser,
  saveCartItems,
  updateCartItemQuantity,
};
