import * as ActionTypes from '../actions/actionTypes';
import * as utility from '../../shared/utility'
import {fetchIngredientsFailed} from "../actions/burgerBuilder";

const BURGER_INITIAL_PRICE = 4

const initialState = {
    ingredients: null,
    totalPrice: BURGER_INITIAL_PRICE,
    error:false,
    building:false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const addIngredient = (state,action)=>{
    let updatedIngredients = utility.updateObject(
        state.ingredients,
        {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
    )

    return utility.updateObject(state,{
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    })
}

const removeIngredient = (state,action)=>{
    let updatedIngredients = utility.updateObject(
        state.ingredients,
        {[action.ingredientName]: state.ingredients[action.ingredientName]-1}
    )

    return utility.updateObject(state,{
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building:true
    })
}


const setIngredient = (state,action)=>{
    return utility.updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: BURGER_INITIAL_PRICE,
        building:false
    })
}

const setIngredientFailed = (state,action)=>{
    return utility.updateObject(state, {
        ...state,
        error: true
    });
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case ActionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case ActionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case ActionTypes.SET_INGREDIENTS:  return setIngredient(state, action)
        case ActionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action)
        default: return state;
    }
}

export default reducer