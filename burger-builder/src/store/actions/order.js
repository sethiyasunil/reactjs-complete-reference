import * as ActionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: ActionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order, idToken) =>{
        return (dispatch)=>{
            dispatch(purchaseBurgerStart())
            axios.post( '/orders.json?auth='+idToken, order )
                .then( response => {
                    dispatch(purchaseBurgerSuccess(response.data.name, order))
                } )
                .catch( error => {
                    dispatch(purchaseBurgerFail(error));
                } );
        }
}


export const purchaseInit = () =>{
    return{
        type: ActionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    return {
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error)=>{
    return {
        type: ActionTypes.FETCH_ORDERS_FAIL,
        error:error
    };

}

export const fetchOrdersStart = () => {
    return {
        type: ActionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = (idToken,userId) => {
    return (dispatch)=>{
        dispatch(fetchOrdersStart())
        const queryParam = '?auth='+idToken+ '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParam)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}




