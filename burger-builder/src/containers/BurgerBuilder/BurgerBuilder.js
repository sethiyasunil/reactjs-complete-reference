import React,{Component} from 'react'
import Aux from '../../hoc/Auxilery'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Model from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {salad:0.5, bacon:0.7 , cheese:0.4, meat:1.3}
class BurgerBuilder extends  Component{

     state = {
                ingredients: { salad:0, bacon:0 , cheese:0, meat:0},
                totalPrice: 4.0,
                purchasable:false,
                purchasing: false


}

    purchasableHandler = ()=>{
         let totalIngredients = Object.keys(this.state.ingredients).map(k=>this.state.ingredients[k]).reduce((ov,nv)=>ov+nv,0)
        this.setState({purchasable:totalIngredients>0},()=>{console.log(this.state.purchasable)})

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
        alert('You continue!');
    }

    render() {
         const disabledInfo = {...this.state.ingredients}
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key]<=0?true:false;
         }
        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            totalPrice = {this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}/>
                </Model>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={ this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        purchasable = {this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder