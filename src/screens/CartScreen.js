import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Trash2, ArrowLeft } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { removeItem_Action } from '../redux/Action';

const CartScreen = () => {

  const cart = useSelector((state) => state.cart); // Cart items from Redux store
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); // Set a default shipping cost
  const [grandTotal, setGrandTotal] = useState(0);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      calculateTotal();
      calculateShipmentCost();
    }, [cart])
  );

  useEffect(() => {
    // Ensure grandTotal updates correctly
    setGrandTotal(totalPrice + shippingCost);
  }, [totalPrice, shippingCost]);

  function calculateShipmentCost (){
    let totalShipmentCost=0;
    cart.forEach(item=>{
      totalShipmentCost += item.shipmentCost
    })
    setShippingCost(totalShipmentCost);
  }
  // Function to calculate the total price
  const calculateTotal = () => {
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
    });

    setTotalPrice(total);
  };

  function getColor(color) {
    let correctColor = color.toLowerCase();
    return correctColor;
  }

  function removeItem(id) {
    dispatch(removeItem_Action(id));
  }

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imgLink }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs {item.price}</Text>
        <View style={styles.itemOptions}>
          <View style={[styles.colorCircle, { backgroundColor: getColor(item.color) }]} />
          <View style={{ padding: 7, backgroundColor: 'white', borderRadius: 25, paddingHorizontal: 10 }}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
        </View>
        <Text style={[styles.itemPrice, { marginTop: 3 }]}>Qty: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
        <Trash2 color={'#F68CB5'} size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={["#FDF0F3", "#FFFBFC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <CustomHeader />

      {/* Cart Items */}
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total:</Text>
          <Text style={styles.summaryText}>Rs {totalPrice.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, { borderBottomColor: '#C0C0C0', borderBottomWidth: 1, paddingBottom: 10 }]}>
          <Text style={styles.summaryText}>Total Shipping:</Text>
          <Text style={styles.summaryText}>Rs {shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Grand Total:</Text>
          <Text style={[styles.summaryText, { color: 'black' }]}>Rs {grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
};

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 5, borderRadius: 20 }}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft color={'#E96E6E'} size={32} />
      </TouchableOpacity>

      <Text style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: '700' }}>My Cart</Text>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybCUyMHNtaWxpbmd8ZW58MHx8MHx8fDA%3D' }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  cartList: {
    flexGrow: 0,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 110,
    height: 130,
    borderRadius: 15,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    marginTop: 3
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 10
  },
  itemOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  sizeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700'
  },
  deleteButton: {
    padding: 5,
  },
  summaryContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#EEE',
    marginTop: 10,
    marginHorizontal: 10
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 6,
  },
  summaryText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '600'
  },
  checkoutButton: {
    backgroundColor: '#F33A6A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
