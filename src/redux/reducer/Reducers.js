import { ADD_TO_CART, EMPTY_TO_CART } from '../constant/constant'

export const loginUser = (data = '', action) => {

    switch (action.type) {
        case ADD_TO_CART:
            console.log("add card", action.data)
            return action.data;

            case EMPTY_TO_CART :
                console.log("remove card", action)
                data=[]
                return [...data];

        default:
            return ''
    }
}