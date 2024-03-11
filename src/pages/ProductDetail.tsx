import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../utils/axios';
import {SafeAreaView} from 'react-native-safe-area-context';

interface RouteProps {
  id: number;
}
const ProductDetail = () => {
  const dimension = Dimensions.get('window');
  const {navigate, setOptions} = useNavigation();
  // console.log('Dimension', dimension);
  const {params} = useRoute<RouteProp<RouteProps>>();
  // console.log('first', params, product);

  const [product, setProduct] = useState({
    id: 29,
    title: 'Handcraft Chinese style',
    description:
      'Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate',
    price: 60,
    discountPercentage: 15.34,
    rating: 4.44,
    stock: 7,
    brand: 'luxury palace',
    category: 'home-decoration',
    thumbnail: 'https://cdn.dummyjson.com/product-images/29/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/29/1.jpg',
      'https://cdn.dummyjson.com/product-images/29/2.jpg',
      'https://cdn.dummyjson.com/product-images/29/3.webp',
      'https://cdn.dummyjson.com/product-images/29/4.webp',
      'https://cdn.dummyjson.com/product-images/29/thumbnail.webp',
    ],
  });

  const fetchProduct = () => {
    axiosInstance.get(`products/${params?.id}`).then(response => {
      setProduct(response.data);
    });
  };

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <Button title="Cart" onPress={() => navigate('Carts')} />;
      },
    });
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [params]);

  const _renderItem = ({item}: {item: []}) => (
    <View>
      <Image
        source={{uri: item}}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    </View>
  );
  const addCarts = () => {
    axiosInstance
      .post('carts', product)
      .then(response => {
        if (response.status === 201 && response.data) {
          Alert.alert('Success', 'The Product was added to the cart!');
        }
        setTimeout(() => {
          return navigate('Products');
        }, 2000);
      })
      .catch(() => {
        Alert.alert('Error', 'An error has occurred');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: product?.thumbnail}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.brandText}>
        {product?.brand}
        {product?.title}
      </Text>
      <Text style={styles.descriptionText}>{product?.description}</Text>
      <Text style={styles.price}>
        ${product?.price} (%{product?.discountPercentage} off)
      </Text>
      <View>
        <FlatList
          data={product?.images}
          renderItem={_renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Button title="Add Cart" onPress={() => addCarts()} />
      <Button
        title="Update Product"
        onPress={() => navigate('ProductUpdate', product)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    gap: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  thumbnail: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
    textAlign: 'center',
  },
});

export default ProductDetail;
