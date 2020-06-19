import React, {Component} from 'react';
import classes from './Orders.module.css'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders:[],
        loading: false
    }

    componentDidMount() {
        this.setState({loading:true})
        let fetchedOrders = []
        axios.get('/orders.json')
            .then((response)=>{
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({loading:false, orders: fetchedOrders})
            })
            .catch((error)=>{
                console.log(error)
                this.setState({loading:false})
            });


    }

    render() {

        let orders = this.state.orders.map(
            (order) =>  <Order ingredients={order.ingredients} price={order.price} key={order.id}/>);
        if(this.state.loading){
            orders= <Spinner/>
        }


        return (
            <div>
                {orders}
            </div>
        )

        }


    }
    export default withErrorHandler(Orders,axios)