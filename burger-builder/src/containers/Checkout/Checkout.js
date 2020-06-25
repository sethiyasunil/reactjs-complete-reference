import React, { Component } from 'react';
import { Route , Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as orderActions from '../../store/actions/index'


class Checkout extends Component {

   checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to="/"/>

        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased? <Redirect to="/"/> : null
            summary = <div>
                        {purchasedRedirect}
                        <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                        <Route
                            path={this.props.match.path + '/contact-data'}
                            component={ContactData} />
                </div>
        }
        return (
            summary
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        ingredients: state.bgr.ingredients,
        purchased : state.odr.purchased
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Checkout);