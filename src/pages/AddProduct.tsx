import {View, Text, TextInput, StyleSheet, Alert, Button} from 'react-native';
import React, {useState} from 'react';
import axiosInstance from '../utils/axios';
import {useNavigation} from '@react-navigation/native';

const AddProduct = () => {
  const {navigate} = useNavigation();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    images: [
      'https://cdn.dummyjson.com/product-images/2/1.jpg',
      'https://cdn.dummyjson.com/product-images/2/2.jpg',
      'https://cdn.dummyjson.com/product-images/2/3.jpg',
      'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    ],
  });

  const onChangeText = (key: string, value: string) => {
    // object.assign({},{}) (the method used before spread operatory)
    setProduct({...product, [key]: value});
    // console.log(key, value, {[key]: value}, {...product, [key]: value});
  };

  const productCreate = () => {
    axiosInstance.post('products', product).then(response => {
      const {status, data} = response;
      if (status === 201) {
        Alert.alert('Success', `${data.title} was added!`);
      }
    });
    setTimeout(() => {
      return navigate('Products');
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>AddProduct</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => onChangeText('title', text)}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={text => onChangeText('description', text)}
        />
        <TextInput
          placeholder="Price"
          style={styles.input}
          onChangeText={text => onChangeText('price', text)}
        />
        <TextInput
          placeholder="Discount Percentage"
          style={styles.input}
          onChangeText={text => onChangeText('discountPercentage', text)}
        />
        <TextInput
          placeholder="Rating"
          style={styles.input}
          onChangeText={text => onChangeText('rating', text)}
        />
        <TextInput
          placeholder="Stock"
          style={styles.input}
          onChangeText={text => onChangeText('stock', text)}
        />
        <TextInput
          placeholder="Brand"
          style={styles.input}
          onChangeText={text => onChangeText('brand', text)}
        />
        <TextInput
          placeholder="Category"
          style={styles.input}
          onChangeText={text => onChangeText('category', text)}
          defaultValue="Smartphones"
        />
        <TextInput
          placeholder="Thumbnail"
          style={styles.input}
          onChangeText={text => onChangeText('thumbnail', text)}
          value={product.thumbnail}
        />
        <Button title="Add Product" onPress={() => productCreate()} />
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

export default AddProduct;
