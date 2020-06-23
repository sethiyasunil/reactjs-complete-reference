import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as ActionCreators  from "../../store/actions/index";

class Counter extends Component {
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
            onIncrementCounter : ()=> dispatch(ActionCreators.increment()),
            onDecrementCounter : ()=> dispatch(ActionCreators.decrement()),
            onAddCounter : ()=> dispatch(ActionCreators.add(5)),
            onSubtractCounter : ()=> dispatch(ActionCreators.subtract(5)),
            onStoreResult: (result)=> dispatch(ActionCreators.storeResult(result)),
            onDeleteResult: (id)=> dispatch(ActionCreators.deleteResult(id))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);