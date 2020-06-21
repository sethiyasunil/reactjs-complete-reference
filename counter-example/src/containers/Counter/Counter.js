import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as ActionTypes from "../../store/actions";

class Counter extends Component {
    /*
        state = {
            counter: 0
        }

        counterChangedHandler = ( action, value ) => {
            switch ( action ) {
                case 'inc':
                    this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                    break;
                case 'dec':
                    this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                    break;
                case 'add':
                    this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                    break;
                case 'sub':
                    this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                    break;
            }
        }*/

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Results</button>
                <ul>
                    {this.props.storedResults.map((aResult)=>(
                        <li onClick={()=>this.props.onDeleteResult(aResult.id)} key={aResult.id}>{aResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        ctr: state.ctr.counter,
        storedResults : state.res.results
    }
}

const mapDispatchToProps  = (dispatch)=>{
        return{
            onIncrementCounter : ()=> dispatch({type:ActionTypes.INCREMENT}),
            onDecrementCounter : ()=> dispatch({type:ActionTypes.DECREMENT}),
            onAddCounter : ()=> dispatch({type:ActionTypes.ADD, value:5}),
            onSubtractCounter : ()=> dispatch({type:ActionTypes.SUBTRACT, value:5}),
            onStoreResult: (result)=> dispatch({type:ActionTypes.STORE_RESULT,result:result}),
            onDeleteResult: (id)=> dispatch({type:ActionTypes.DELETE_RESULT,id:id})
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);