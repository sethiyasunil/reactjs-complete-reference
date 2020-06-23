import * as ActionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialSate = {
    results:[]
}
const reducer = (state = initialSate,action)=>{
    console.log('results reducer called ' , state, action);
    switch(action.type){
        case ActionTypes.STORE_RESULT:
            return updateObject(state,{results: state.results.concat({id:new Date(), value:action.result})})
        case ActionTypes.DELETE_RESULT:
            return updateObject(state,{results: state.results.filter((e)=> e.id!==action.id)})
    }
    return state;
}

export default reducer;