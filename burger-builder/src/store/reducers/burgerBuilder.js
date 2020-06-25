import * as ActionTypes from '../actions/actionTypes';

const BURGER_INITIAL_PRICE = 4

const initialState = {
    ingredients: null,
    totalPrice: BURGER_INITIAL_PRICE,
    error:false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState,action)=>{
    let updatedState=null;
    switch(action.type){
        case ActionTypes.ADD_INGREDIENT:
            updatedState =  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            break;
        case ActionTypes.REMOVE_INGREDIENT:
            updatedState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            }
            break;
        case ActionTypes.SET_INGREDIENTS:
            updatedState = {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: BURGER_INITIAL_PRICE
            }
            break;
        case ActionTypes.FETCH_INGREDIENTS_FAILED:
            updatedState = {
                ...state,
                error: true
            }
            break;
        default:
            console.log('invalid action type '+ action.type)
            updatedState= state;
            break;
    }
    return updatedState;


}

export default reducer