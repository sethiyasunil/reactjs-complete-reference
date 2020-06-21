import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as ActionTypes from "../../store/actions";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        ingredients: state.ingredients
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Checkout);