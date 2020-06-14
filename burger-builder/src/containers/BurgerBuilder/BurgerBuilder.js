import React,{Component} from 'react'
import Aux from '../../hoc/Auxilery/Auxilery'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {salad:0.5, bacon:0.7 , cheese:0.4, meat:1.3}
class BurgerBuilder extends  Component{

     state = {
                ingredients: null,
                totalPrice: 4.0,
                purchasable:false,
                purchasing: false,
         loading:false


}

    purchasableHandler = ()=>{
         let totalIngredients = Object.keys(this.state.ingredients).map(k=>this.state.ingredients[k]).reduce((ov,nv)=>ov+nv,0)
        this.setState({purchasable:totalIngredients>0})

  }

     addIngredientHandler = (type)=>{
         let oldIngredientCount = this.state.ingredients[type]
         const updatedIngredientCount = oldIngredientCount+1
         const ingredientsCopy= { ...this.state.ingredients}
         ingredientsCopy[type] = updatedIngredientCount
         const oldPrice = this.state.totalPrice
         const newPrice = oldPrice + INGREDIENT_PRICES[type]
         this.setState({ingredients:ingredientsCopy, totalPrice:newPrice},()=>this.purchasableHandler())

     }

    removeIngredientHandler = (type)=>{
        console.log(type)
        let oldIngredientCount = this.state.ingredients[type]
        if(oldIngredientCount<=0) {

            return;
        }
        const updatedIngredientCount = oldIngredientCount-1
        const ingredientsCopy= { ...this.state.ingredients}
        ingredientsCopy[type] = updatedIngredientCount
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - INGREDIENT_PRICES[type]
        this.setState({ingredients:ingredientsCopy, totalPrice:newPrice},()=>this.purchasableHandler())
    }

    purchaseHandler = ()=>{
         this.setState({purchasing:true})
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }


    purchaseContinueHandler = () => {
        this.setState({loading:true})
        let order = {
                        ingredients:this.state.ingredients,
                        price: this.state.totalPrice,
                        customer: {name:'Sunil', address:'Gurgaon', zipCode:'442424', email:'test@test.com',deliveryMethod:'fastest'}
                     }
         axios.post('/orders.json',order)
             .then(response=>{
                 console.log(response)
                 this.setState({loading:false, purchasing:false})
                 return response;
             })
             .catch(error=>{
                 console.log('error received')
                 this.setState({loading:false,purchasing:false})
                 return Promise.reject(error)
             })
    }

    componentDidMount() {
         axios.get("/ingredients.json")
             .then(res=>{
                 this.setState({ingredients: res.data})
             })
    }

    render() {
         const disabledInfo = {...this.state.ingredients}
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key]<=0?true:false;
         }

         let orderSummary = null
         if(this.state.ingredients){
             orderSummary = <OrderSummary
                 ingredients={this.state.ingredients}
                 totalPrice = {this.state.totalPrice}
                 purchaseCancelled={this.purchaseCancelHandler}
                 purchaseContinued={this.purchaseContinueHandler}/>
         }
         if(this.state.loading){
             orderSummary=<Spinner/>
         }

         let burger = (
             <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={ this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        purchasable = {this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
             </Aux>)
             if(!this.state.ingredients){
                 burger=<Spinner/>
             }

        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        )
    }

}

export default withErrorHandler(BurgerBuilder, axios)