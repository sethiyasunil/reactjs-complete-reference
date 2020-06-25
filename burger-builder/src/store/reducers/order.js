import * as ActionTypes from '../actions/actionTypes';

const initialState={
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState,action)=>{

    switch(action.type) {
        case ActionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }
        case ActionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
                purchased: true
            }
            return {
                ...state,
                loading: false,
                orders : state.orders.concat(newOrder),
                purchased : true
            }
        case ActionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                loading:false
            }
        case ActionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased : false
            }
        case ActionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
         case ActionTypes.FETCH_ORDERS_SUCCESS:
                return {
                    ...state,
                    orders: action.orders,
                    loading: false
                }
        case ActionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: true,
                loading: false

            }
        default:
            return state;
    }
}

export default reducer