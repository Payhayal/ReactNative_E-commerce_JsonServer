import {
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../utils/axios';
import {ProductProps} from '../types';

const Products = () => {
  const {navigate, setOptions} = useNavigation();
  const [products, setProducts] = useState<ProductProps | []>([]);

  const fetchProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
    });
  };
  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <Button title="Cart" onPress={() => navigate('Carts')} />;
      },
      headerLeft: () => {
        return (
          <Button title="Add Product" onPress={() => navigate('AddProduct')} />
        );
      },
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}: {item: ProductProps}) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('ProductDetail', {id: item?.id})}>
              <View style={styles.productContainer}>
                <Image
                  source={{uri: item?.thumbnail}}
                  style={{width: 100, height: 100}}
                />
                <Text>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
});
