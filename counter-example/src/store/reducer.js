import * as ActionTypes from './actions'
const initialSate = {
    counter:0,
    results:[]
}
const reducer = (state = initialSate,action)=>{
    console.log('reducer called ' , state, action);
    switch(action.type){
        case ActionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter+1
            }
        case ActionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter-1
            }
        case ActionTypes.ADD:
            return {
                ...state,
                counter: state.counter+ action.value
            }
        case ActionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter-action.value
            }
        case ActionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id:new Date(), value:state.counter})
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