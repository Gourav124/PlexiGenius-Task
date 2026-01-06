import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './src/screens/Homescreen';
import CartScreen from './src/screens/CartScreen';
// import { FavoritesScreen, ProfileScreen } from './src/screens/TabScreens';
import CustomTabBar from './src/components/CustomTabBar';
import ProfileScreen from './src/screens/ProfileScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorites" component={FavouritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;