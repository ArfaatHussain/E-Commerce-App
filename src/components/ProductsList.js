import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 10;
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import Loader from './Loader';
import {useEffect} from 'react';
export default ProductsList = () => {

    const category = useSelector((state) => state.category);
    const searchedData = useSelector((state) => state.searchedData);
    const [products, setProducts] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        fetchProducts();
    }, [category, searchedData]);

    const fetchProducts = async () => {
        setShowLoader(true);
        try {
            let url;
            searchedData ? url = `https://real-time-product-search.p.rapidapi.com/search?q=${searchedData}&country=pk&language=en&limit=20` : url = `https://real-time-product-search.p.rapidapi.com/search?q=${category}&country=pk&language=en&limit=20`

            let response = await axios.get(url, {
                headers: {
                    'x-rapidapi-key': '9647f571d1mshc4127e3887503f8p130f31jsnb219605264e3',
                    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
                }
            })
           
            setProducts(response.data.data.products);
            // console.warn(response.data);
        } catch (error) {
            
            setError(error.message);
        }
        finally{
            setShowLoader(false);
        }
    }

    function getCorrectText(text) {
        // Convert the entire text to lowercase first
        const lowerText = text.toLowerCase();

        // Split the text into an array of words
        const words = lowerText.split(' ');

        // Map over the array and capitalize the first letter of each word
        const correctedWords = words.map(word => {
            // Capitalize first letter and combine it with the rest of the lowercase word
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        // Get only the first two words
        const firstTwoWords = correctedWords.slice(0, 2);

        // Join the two words back into a single string
        return firstTwoWords.join(' ');
    }

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
            style={styles.productCard}>
            <Image source={{ uri: item.product_photos[0] }} style={styles.productImage} />
            {/* <View style={{alignItems:'center'}} > */}
            <Text style={styles.productTitle}>{getCorrectText(item.product_title)}</Text>
            <Text style={styles.productPrice}>{item.product_price}</Text>
            {/* </View> */}

        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1 }} >

            {
                showLoader ? <Loader text={"Getting Products for you..."} />
                    : products.length ?
                        <FlatList
                            data={products}
                            numColumns={2}
                            renderItem={renderProduct}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            contentContainerStyle={styles.productGrid}
                            showsVerticalScrollIndicator={false}
                        />
                        : null
            }

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBE9E7',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    searchInput: {
        flex: 1,
        // paddingVertical: 1,
        paddingHorizontal: 10,
        fontSize: 16
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#EF5350',
    },
    tabText: {
        color: '#757575',
    },
    tabTextActive: {
        color: '#fff',
    },
    productGrid: {
        paddingBottom: 20,
        justifyContent: 'space-around',
    },
    productCard: {
        flex: 1,
        borderRadius: 10,
        marginBottom: 5,
        maxWidth: cardWidth
    },
    productImage: {
        width: 150,
        height: 200,
        borderRadius: 20,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444444',
        textAlign: 'center',
        marginLeft: -15
    },
    productPrice: {
        fontSize: 16,
        color: '#9C9C9C',
        marginVertical: 5,
        textAlign: 'center',
        marginLeft: -15
    },
    favoriteIcon: {
        marginTop: 10,
    },
});