import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, ShoppingCart } from 'lucide-react-native';
import {Text,View} from 'react-native'
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='BottomTab'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='BottomTab' component={BottomNavigation} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default HomeNavigation;


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

    const cart = useSelector((state)=>state.cart);

    const cartItemCount = cart.length;

    function getIcon(label, focused) {
        if (label === "Home") {
          return focused ? <House size={34} color={'#E96E6E'} /> : <House size={34} color={'#C0C0C0'} />;
        } else {
          return (
            <View style={{ position: 'relative' }}>
              <ShoppingCart size={34} color={focused ? '#E96E6E' : '#C0C0C0'} />
              {cartItemCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -14,
                    right: -12,
                    backgroundColor: focused? '#F33A6A': "#C0C0C0",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{cartItemCount}</Text>
                </View>
              )}
            </View>
          );
        }
      }

    return (

        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: '#FFFBFC',
                    height:70,
                    justifyContent:'center',
                    alignItems:'center'
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => getIcon("Home", focused),
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) =>getIcon("Cart", focused),
                }}
            />
        </Tab.Navigator>


    )
}

