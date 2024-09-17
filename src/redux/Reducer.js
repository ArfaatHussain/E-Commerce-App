import {SEARCHED_DATA,SET_CATEGORY_OF_ITEMS,SET_CART,REMOVE_ITEM} from './Event';

export const searchedData_reducer = (state="",action)=>{
    switch(action.type){
        case SEARCHED_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const setCart_reducer = (state = [], action) => {
    switch(action.type) {
        case SET_CART:
            let existingProductIndex = state.findIndex(item=> item.id == action.payload.id);
            
            if(existingProductIndex !== -1){
                let updatedArray = [...state];
                updatedArray[existingProductIndex] = {
                    ...updatedArray[existingProductIndex],
                    quantity: action.payload.quantity + updatedArray[existingProductIndex].quantity
                }

                return updatedArray;
            }
            else{
                return [...state, action.payload];
            }
        case  REMOVE_ITEM:
            return state.filter(item => item.id !== action.payload);    
        default:
            return state;
    }
}

export const setCategoryOfItems_reducer = (state = "", action) => {
    switch(action.type){
        case SET_CATEGORY_OF_ITEMS:
            return action.payload;
        default:
            return state;
    }
}

