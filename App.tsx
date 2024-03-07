import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './src/pages/Products';
import ProductDetail from './src/pages/ProductDetail';
import Carts from './src/pages/Carts';
import AddProduct from './src/pages/AddProduct';
import ProductUpdate from './src/pages/ProductUpdate';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Carts" component={Carts} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductUpdate" component={ProductUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
