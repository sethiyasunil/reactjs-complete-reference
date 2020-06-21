import * as ActionTypes from '../actions'
const initialSate = {
    counter:0,
    results:[]
}
const reducer = (state = initialSate,action)=>{
    console.log('reducer called ' , state, action);
    switch(action.type){
        case ActionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id:new Date(), value:action.result})
            }
        case ActionTypes.DELETE_RESULT:
            return {
                ...state,
                results: state.results.filter((e)=> e.id!==action.id)
            }
    }
    return state;
}

export default reducer;