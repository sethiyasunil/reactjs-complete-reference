import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counterReducer'
import resultsReducer from './store/reducers/resultsReducer'
import {createStore,combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';



const logger = (store)=>{
    return (next)=>{
        return (action)=>{
            console.log('logger middleware start  ', store)
            console.log('logger middleware dispatching ', action)
            const result = next(action)
            console.log('logger middleware end  ', result)
            return result;
        }
    }
}

let rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
