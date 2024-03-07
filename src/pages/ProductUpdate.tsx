import {View, Text, TextInput, Alert, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import axiosInstance from '../utils/axios';
import {useNavigation} from '@react-navigation/native';

const ProductUpdate = (props: any) => {
  const [product, setProduct] = useState(props?.route?.params);
  const {navigate} = useNavigation();

  const onChangeText = (key: string, value: string) => {
    setProduct({...product, [key]: value});
  };

  function productUpdate(): void {
    axiosInstance.put(`products/${product?.id}`, product).then(response => {
      const {status} = response;
      if (status === 200) {
        Alert.alert('Success', 'The Prooduct was updated!');
      }
      return navigate('Products');
      // console.log(response);
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => onChangeText('title', text)}
          value={product?.title}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={text => onChangeText('description', text)}
          value={product?.description}
        />
        <TextInput
          placeholder="Price"
          style={styles.input}
          onChangeText={text => onChangeText('price', text)}
          value={String(product?.price)}
        />
        <TextInput
          placeholder="Discount Percentage"
          style={styles.input}
          onChangeText={text => onChangeText('discountPercentage', text)}
          value={String(product?.discountPercentage)}
        />
        <TextInput
          placeholder="Rating"
          style={styles.input}
          onChangeText={text => onChangeText('rating', text)}
          value={String(product?.rating)}
        />
        <TextInput
          placeholder="Stock"
          style={styles.input}
          onChangeText={text => onChangeText('stock', text)}
          value={String(product?.stock)}
        />
        <TextInput
          placeholder="Brand"
          style={styles.input}
          onChangeText={text => onChangeText('brand', text)}
          value={product?.brand}
        />
        <TextInput
          placeholder="Category"
          style={styles.input}
          onChangeText={text => onChangeText('category', text)}
          defaultValue="Smartphones"
          value={product?.category}
        />

        <Button title="Update Product" onPress={() => productUpdate()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
  },
  inputContainer: {
    gap: 15,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
  },
});

export default ProductUpdate;
