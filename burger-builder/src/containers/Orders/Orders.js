import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from "react-redux";
import * as ordersAction from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken, this.props.userId);
    }

    render () {
        let orders = <Spinner/>
        if(!this.props.loading)
                orders =  this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))

        return (
            <div>
                {orders}
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        orders: state.odr.orders,
        loading: state.odr.loading,
        idToken: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        onFetchOrders: (idToken, userId)=> dispatch(ordersAction.fetchOrders(idToken, userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));