import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counterReducer'
import resultsReducer from './store/reducers/resultsReducer'
import {createStore,combineReducers} from "redux";
import {Provider} from 'react-redux'


let rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
})
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
