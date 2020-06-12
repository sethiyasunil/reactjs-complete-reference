import React, {Component} from 'react'
import Person from "./Person/Person";

class Persons extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("Persons.js shouldComponentUpdate()")
        return nextProps.persons !== this.props.persons
    }


    render() {
        console.log('Persons.s render()')
        return(
            this.props.persons.map((p,index)=> {
                return <Person person={p}  key={index} changed={this.props.changed}/>
            })

        )
    }
}
export default Persons