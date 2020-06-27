import * as ActionTypes from '../actions/actionTypes';
import * as utility from '../../shared/utility'

const initialState={
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state)=>{
    return utility.updateObject(state, {purchased:false})
}

const purchaseStart = (state)=>{
    return utility.updateObject(state, {loading:true})
}

const purchaseSuccess = (state, action)=>{
    const newOrder = {
        ...action.orderData,
        id: action.id,
        purchased: true
    }
    return utility.updateObject(state,
        {loading: false,
            orders : state.orders.concat(newOrder),
            purchased : true})
}

const fetchIngredientsFailed= (state) =>{
    return utility.updateObject(state, {loading:false})
}

const fetchOrdersStart= (state) =>{
    return utility.updateObject(state, {loading: true})
}

const fetchOrdersSuccess = (state, action)=>{
    return utility.updateObject(state, {
        orders: action.orders,
        loading: false})
}

const fetchOrdersFail= (state) =>{
    return utility.updateObject(state, {error: true,
        loading: false})
}

const reducer = (state = initialState,action)=>{

    switch(action.type) {
        case ActionTypes.PURCHASE_BURGER_START: return purchaseStart(state);
        case ActionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action)
        case ActionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        case ActionTypes.PURCHASE_INIT: return purchaseInit(state);
        case ActionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case ActionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action)
        case ActionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        default:
            return state;
    }
}

export default reducer