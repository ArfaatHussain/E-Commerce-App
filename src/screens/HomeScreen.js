import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import { Search } from 'lucide-react-native';
import Category from '../components/Category';
import ProductsList from '../components/ProductsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { searchData } from '../redux/Action';

const HomeScreen = () => {

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.container}
        colors={["#FDF0F3", "#FFFBFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar backgroundColor={'lightgrey'} barStyle={'dark-content'} />

        {/* Wrap content in KeyboardAvoidingView to handle keyboard properly */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            {/* Header */}
            <Header />

            {/* Search Bar */}
            <View style={[styles.searchContainer,{borderColor: search? "#F33A6A":"#fff"}]}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor={"#B6B6B6"}
                onChangeText={(text) =>{ 
                  setSearch(text)
                  dispatch(searchData(text))
                }}
                value={search}
              />
              {/* <TouchableOpacity onPress={() => dispatch(searchData(search))}> */}
                <Search color={ search ? '#F33A6A': "#C0C0C0"} size={28} />
              {/* </TouchableOpacity> */}
            </View>

            {/* Categories */}
            <Category />

            {/* Products Grid */}
            <ProductsList />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 5, // Added margin to prevent content overlap
    borderWidth:1
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default HomeScreen;
