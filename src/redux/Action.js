import {SET_CART,SEARCHED_DATA,SET_CATEGORY_OF_ITEMS,REMOVE_ITEM} from './Event';

export function setCart(id,imgLink, name, price, color, size, quantity,shipmentCost) {
    return {
        type: SET_CART,
        payload: {
            id,
            imgLink,
            name,
            price,
            color,
            size,
            quantity,
            shipmentCost
        }
    };
}

export function setCategoryOfItems(category) {

    return {
        type: SET_CATEGORY_OF_ITEMS,
        payload: category
    };

}

export function searchData(data) {
    return{
        type: SEARCHED_DATA,
        payload: data
    }
}

export function removeItem_Action(id) {
    return{
        type: REMOVE_ITEM,
        payload: id
    }
}
