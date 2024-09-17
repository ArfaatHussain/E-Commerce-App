import {configureStore} from '@reduxjs/toolkit';
import {searchedData_reducer,setCart_reducer,setCategoryOfItems_reducer} from './Reducer';
const store = configureStore({
    reducer:{
        searchedData: searchedData_reducer,
        cart: setCart_reducer,
        category: setCategoryOfItems_reducer
    }
})

export default store;