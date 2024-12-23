import {ADD_TO_CART, EMPTY_TO_CART} from '../constant/constant'
export const addToCart=(data)=>{
    console.log('lll',data)
    return{
        type: ADD_TO_CART,
        data
    }
}
export const emptyCart=(data)=>{
    console.log("empty")
    return{
        type:EMPTY_TO_CART,
    }
}