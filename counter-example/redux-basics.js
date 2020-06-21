const redux = require('redux');

const initialState = {
    counter:0
}


//Reducer
const reducer = (state = initialState, action)=>{

    if(action.type==='ADD_COUNTER'){
        return {
            ...state,
            counter : state.counter+1
        }
    }
    if(action.type==='INC_COUNTER'){
        return {
            ...state,
            counter : state.counter + action.value
        }
    }
    return state;
}

//Store
const createStore = redux.createStore
const store = createStore(reducer);

//Listener
store.subscribe(()=>{
    console.log('[subscription]', store.getState())
})

//Dispatching Action
store.dispatch({type:'ADD_COUNTER'})
store.dispatch({type:'INC_COUNTER',value:5})
