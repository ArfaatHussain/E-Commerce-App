import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList,SafeAreaView } from 'react-native';

export default Header = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.icon}>
                <Image source={require('../../assets/images/GridIcon.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <Text style={styles.title}>Match Your Style</Text>
            <TouchableOpacity>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybCUyMHNtaWxpbmd8ZW58MHx8MHx8fDA%3D' }}
                    style={styles.profileImage}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 25,
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

});