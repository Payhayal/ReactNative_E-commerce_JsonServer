import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProductProps} from '../types';
import axiosInstance from '../utils/axios';
import {useNavigation} from '@react-navigation/native';

const Carts = () => {
  const {navigate} = useNavigation();
  const [carts, setCarts] = useState<ProductProps[] | []>([]);

  const fetchCarts = () => {
    axiosInstance.get('carts').then(response => {
      const {status, data} = response;
      if (status === 200) {
        setCarts(data);
      }
    });
  };

  const deleteCarts = (cartId: number) => {
    axiosInstance
      .delete(`carts/${cartId}`)
      .then(response => {
        const {status} = response;

        if (status === 200) {
          fetchCarts();
          Alert.alert('Success', 'The Product was removed from the cart!');
        }
      })
      .catch(err => {
        Alert.alert('Error', 'An error has occurred');
      });
  };
  useEffect(() => {
    fetchCarts();
  }, []);
  const _renderCarts =
    carts && carts?.length > 0 ? (
      carts.map(cart => (
        <View key={cart.id} style={styles.cartView}>
          <Image style={styles.imageCart} source={{uri: cart?.thumbnail}} />
          <View style={styles.viewText}>
            <Text>{cart?.title}</Text>
            <Text>{cart?.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => deleteCarts(cart?.id)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <View style={styles.cartWarning}>
        <Text style={styles.textWarning}>You have no products yet!</Text>
        <Button title="Go to Products" onPress={() => navigate('Products')} />
      </View>
    );

  return <ScrollView style={styles.scrollCart}>{_renderCarts}</ScrollView>;
};

const styles = StyleSheet.create({
  scrollCart: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  cartView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  viewText: {
    marginBottom: 6,
    alignItems: 'center',
  },
  imageCart: {
    width: 100,
    height: 100,
  },
  btnDelete: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btnText: {
    color: '#fff',
  },
  textWarning: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  cartWarning: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Carts;
