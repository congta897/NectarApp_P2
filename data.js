const products = [
  {
    id: 'egg-red',
    title: 'Egg Chicken Red',
    subtitle: '4pcs, Price',
    price: 1.99,
    imageKey: 'egg-red',
    searchableText: 'egg chicken red eggs',
    detailRoute: 'ProductDetail',
  },
  {
    id: 'egg-white',
    title: 'Egg Chicken White',
    subtitle: '180g, Price',
    price: 1.5,
    imageKey: 'egg-white',
    searchableText: 'egg chicken white eggs',
  },
  {
    id: 'egg-pasta',
    title: 'Egg Pasta',
    subtitle: '30gm, Price',
    price: 15.99,
    imageKey: 'egg-pasta',
    searchableText: 'egg pasta noodles',
  },
  {
    id: 'egg-noodles-red',
    title: 'Egg Noodles',
    subtitle: '2L, Price',
    price: 15.99,
    imageKey: 'egg-noodles-red',
    searchableText: 'egg noodles red',
  },
  {
    id: 'mayonnaise',
    title: 'Mayonnais Eggless',
    subtitle: '325ml, Price',
    price: 8.99,
    imageKey: 'mayonnais',
    searchableText: 'mayonnaise eggless mayonnais',
  },
  {
    id: 'egg-noodles-purple',
    title: 'Egg Noodles',
    subtitle: '330gm, Price',
    price: 14.99,
    imageKey: 'egg-noodles-purple',
    searchableText: 'egg noodles purple',
  },
  {
    id: 'diet-coke',
    title: 'Diet Coke',
    subtitle: '355ml, Price',
    price: 1.99,
    imageKey: 'diet-coke',
    searchableText: 'diet coke beverage drink',
  },
  {
    id: 'sprite',
    title: 'Sprite Can',
    subtitle: '325ml, Price',
    price: 1.5,
    imageKey: 'sprite',
    searchableText: 'sprite can beverage drink',
  },
  {
    id: 'apple-grape',
    title: 'Apple & Grape Juice',
    subtitle: '2L, Price',
    price: 15.5,
    imageKey: 'apple-grape',
    searchableText: 'apple grape juice beverage drink',
  },
  {
    id: 'orange',
    title: 'Orange Juice',
    subtitle: '2L, Price',
    price: 15.99,
    imageKey: 'orange',
    searchableText: 'orange juice beverage drink',
  },
  {
    id: 'coca',
    title: 'Coca Cola Can',
    subtitle: '325ml, Price',
    price: 4.99,
    imageKey: 'coca',
    searchableText: 'coca cola can beverage drink',
  },
  {
    id: 'pepsi',
    title: 'Pepsi Can',
    subtitle: '330ml, Price',
    price: 4.99,
    imageKey: 'pepsi',
    searchableText: 'pepsi can beverage drink',
  },
  {
    id: 'pepper',
    title: 'Bell Pepper Red',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'pepper',
    searchableText: 'bell pepper red vegetable',
  },
  {
    id: 'banana',
    title: 'Organic Bananas',
    subtitle: '12kg, Price',
    price: 3.0,
    imageKey: 'banana',
    searchableText: 'organic bananas banana fruit',
  },
  {
    id: 'ginger',
    title: 'Ginger',
    subtitle: '250gm, Price',
    price: 2.99,
    imageKey: 'ginger',
    searchableText: 'ginger root',
  },
];

const searchProductIds = [
  'egg-red',
  'egg-white',
  'egg-pasta',
  'egg-noodles-red',
  'mayonnaise',
  'egg-noodles-purple',
];

const beverageProductIds = ['diet-coke', 'sprite', 'apple-grape', 'orange', 'coca', 'pepsi'];

const favouriteProductIds = ['sprite', 'diet-coke', 'apple-grape', 'coca', 'pepsi'];

const cartItems = [
  { productId: 'pepper', quantity: 1 },
  { productId: 'egg-red', quantity: 1 },
  { productId: 'banana', quantity: 1 },
  { productId: 'ginger', quantity: 1 },
];

const productImages = {
  'egg-red': require('./assets/trung ga do.png'),
  'egg-white': require('./assets/trung ga trang.png'),
  'egg-pasta': require('./assets/egg pasta.png'),
  'egg-noodles-red': require('./assets/egg noodles red.png'),
  mayonnais: require('./assets/mayonnais.png'),
  'egg-noodles-purple': require('./assets/egg noodles purple.png'),
  'diet-coke': require('./assets/coke.png'),
  sprite: require('./assets/sprite.png'),
  'apple-grape': require('./assets/nước táo.png'),
  orange: require('./assets/nước cam.png'),
  coca: require('./assets/coca.png'),
  pepsi: require('./assets/pepsi.png'),
  pepper: require('./assets/ớt chuông.png'),
  banana: require('./assets/banana.png'),
  ginger: require('./assets/gừng.png'),
};

function getProductById(productId) {
  return products.find((item) => item.id === productId);
}

function getProductsByIds(productIds) {
  return productIds
    .map((productId) => getProductById(productId))
    .filter(Boolean);
}

function getProductImage(imageKey) {
  return productImages[imageKey];
}

function normalizeSearchTerms(input) {
  if (Array.isArray(input)) {
    return input.flatMap((item) => normalizeSearchTerms(item));
  }

  return `${input || ''}`
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function matchesProductSearch(product, input) {
  const terms = normalizeSearchTerms(input);
  if (!terms.length) {
    return true;
  }

  const searchableText = `${product.title} ${product.subtitle} ${product.searchableText || ''}`.toLowerCase();
  return terms.some((term) => searchableText.includes(term));
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export {
  beverageProductIds,
  cartItems,
  favouriteProductIds,
  formatPrice,
  getProductById,
  getProductImage,
  getProductsByIds,
  matchesProductSearch,
  products,
  searchProductIds,
};
