import {View,Text,StyleSheet,ActivityIndicator
} from 'react-native';

export default Loader = ({text})=>{
    return(
        <View style={styles.loader}>
            <ActivityIndicator size={60} color="#F33A6A"/>
            <Text style={{fontSize:17,color:"#F33A6A",marginTop:10}} >{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})