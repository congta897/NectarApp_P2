// App.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuthToken } from './services/storageService';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SignInScreen from './screens/SignInScreen';
import NumberScreen from './screens/NumberScreen';
import VerificationScreen from './screens/VerificationScreen';
import LocationScreen from './screens/LocationScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ExploreScreen from './screens/ExploreScreen';
import BeveragesScreen from './screens/BeveragesScreen';
import FiltersScreen from './screens/FiltersScreen';
import CartScreen from './screens/CartScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import OrdersScreen from './screens/OrdersScreen';
import AccountScreen from './screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        const savedToken = await getAuthToken();
        if (isMounted) {
          setInitialRouteName(savedToken ? 'Home' : 'Splash');
        }
      } catch (error) {
        if (isMounted) {
          setInitialRouteName('Splash');
        }
      }
    };

    bootstrapAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!initialRouteName) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Number" component={NumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
