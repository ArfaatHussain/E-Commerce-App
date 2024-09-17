import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { categories } from '../Constant';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setCategoryOfItems } from '../redux/Action';

export default Category = () => {

    const searchedData = useSelector((state)=>state.searchedData);

    const [selectedCategory, setSelectedCategory] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchedData && searchedData.length > 0) {
            setSelectedCategory()
            // You can set the selectedCategory based on your logic if `searchedData` is not empty
        } else {
            setSelectedCategory(0); // Set to 0 if `searchedData` is empty
        }
    }, [searchedData]);
    

    function getSelectedStyle(index) {
        return selectedCategory == index;
    }

    // Initial category
    useEffect(() => {
        dispatch(setCategoryOfItems("shirt"));
    }, []);

    function handleClick(index) {
        setSelectedCategory(index);
        switch (index) {
            case 0:
                dispatch(setCategoryOfItems("shirt"));
                break;
            case 1:
                dispatch(setCategoryOfItems("pant"));
                break;
            case 2:
                dispatch(setCategoryOfItems("shoe"));
                break;
            case 3:
                dispatch(setCategoryOfItems("purse"));
                break;
            case 4:
                dispatch(setCategoryOfItems("jacket"));
                break;
            case 5:
                dispatch(setCategoryOfItems("mobile"));
                break;
            default:
                dispatch(setCategoryOfItems("tablet"));
        }
    }

    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
        >
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.categoryBox,
                        getSelectedStyle(index) && { backgroundColor: '#F33A6A' }
                    ]}
                    onPress={() => handleClick(index)}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            getSelectedStyle(index) && { color: 'white' }
                        ]}
                    >
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        maxHeight:50
    },
    categoryBox: {
        backgroundColor: '#DFDCDC',
        marginRight: 10,
        paddingHorizontal: 23,
        borderRadius: 15,
        justifyContent:'center',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#938F8F',
        textAlign: 'center', 
    },
});
