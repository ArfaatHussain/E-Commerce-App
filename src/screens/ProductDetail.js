import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Minus } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/Action';
import { LinearGradient } from 'expo-linear-gradient';

const ProductDetail = ({ route, navigation }) => {
  const product = route.params.product;
  const dispatch = useDispatch();
  // console.warn(product);
  
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Gray');
  const [quantity, setQuantity] = useState(0);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Gray', 'Red', 'Blue', 'Brown', 'Green', 'Black'];

  function getCorrectText(text) {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(' ');
    const correctedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const firstTwoWords = correctedWords.slice(0, 2);
    return firstTwoWords.join(' ');
  }

  function reduceQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      alert('Cannot reduce quantity below 0');
    }
  }

  function handleAddToCart() {
    if (quantity > 0) {
      const id = product.product_id;
      let imgLink = product.product_photos[0];
      let name = getCorrectText(product.product_title);
      let price = Math.round(300 + Math.random() * 2000)
      let shipmentCost = Math.round(Math.random() * 200)
      dispatch(setCart(id, imgLink, name, price, selectedColor, selectedSize, quantity,shipmentCost));
      navigation.navigate("CartScreen");
    } else {
      alert('Please select a quantity');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar backgroundColor={'lightgrey'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          style={styles.gradient}
          colors={["#FDF0F3", "#FFFBFC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
            <Header />
          </View>

          {/* Product Image */}
          <View style={{ height: 350 }}>
            <Swiper autoplay={true} autoplayTimeout={3} loop={true}>
              {product.product_photos.map((imageUrl, index) => (
                <View key={index}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.productImage}
                    resizeMode='contain'
                  />
                </View>
              ))}
            </Swiper>
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{getCorrectText(product.product_title)}</Text>
              <Text style={styles.productPrice}>{product.product_price}</Text>
            </View>

            {/* Sizes */}
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizesContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonSelected
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Colors */}
            <Text style={styles.sectionTitle}>Colors</Text>
            <View style={styles.colorsContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    selectedColor === color && styles.colorCircleSelected
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <View style={[
                    styles.colorCircleInner,
                    { backgroundColor: color.toLowerCase() }
                  ]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add to Cart Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, marginRight: 45 }}>
              <TouchableOpacity
                onPress={reduceQuantity}
                style={[styles.quantityButton,{marginRight:10}]}
              >
                <Minus color={'#F33A6A'} size={27} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={[styles.quantityButton,{marginLeft:10}]}
              >
                <Plus color={'#F33A6A'} size={27} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              onPress={() => handleAddToCart()}
              style={[styles.addToCartButton, { backgroundColor: quantity == 0 ? "#CCCCCC" : "#F33A6A" }]}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    paddingBottom:20
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 70,
    marginRight: 10,
  },
  sizeButtonSelected: {
    backgroundColor: '#F33A6A',
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  sizeTextSelected: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  colorsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorCircle: {
    marginRight: 10,
    padding: 2,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    borderRadius: 20,
  },
  colorCircleSelected: {
    borderColor: '#FF6B6B',
  },
  colorCircleInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  addToCartButton: {
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    flex: 3,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityButton: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 80,
    borderColor: '#F33A6A',
    borderWidth: 1.7,
  },
  quantityText: {
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ProductDetail;
