import * as ActionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
const initialState = {
    counter:0
}
const reducer = (state = initialState,action)=>{
    console.log('counter reducer called ' , state, action);
    switch(action.type){
        case ActionTypes.INCREMENT:
            return updateObject(state,{counter: state.counter+1})
        case ActionTypes.DECREMENT:
            return updateObject(state,{counter: state.counter-1})
        case ActionTypes.ADD:
            return updateObject(state,{counter: state.counter+ action.value})
        case ActionTypes.SUBTRACT:
            return updateObject(state,{counter: state.counter-action.value})
    }
    return state;
}

export default reducer;