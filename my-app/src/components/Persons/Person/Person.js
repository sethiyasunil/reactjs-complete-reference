import React, {Component} from 'react'
import classes from './Person.css'
import Aux from '../../../hoc/Auxilery'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef()
    }

    static contextType = AuthContext

    componentDidMount() {
        console.log('Person.componentDidUpdate() for id '+ this.props.person.id)
        //this.inputElement.focus()
        this.inputElementRef.current.focus()

    }

    render(){
         return (
             <Aux>
                     {
                        this.context.authenticated?<p>Authenticated</p>:<p>Log In</p>
                     }
                     <p onClick={this.props.click}>I', {this.props.person.name} and I am {this.props.person.age} years old.</p>
                     <p>{this.props.children}</p>
                     <input type="text" onChange={(event) => this.props.changed(event, this.props.person.id)}
                     //ref={(ie)=> {this.inputElement = ie}}
                     ref={this.inputElementRef}
                     />

             </Aux>
         )
     }
}

Person.propTypes = {
    age: PropTypes.number,
    click: PropTypes.func,
    person: PropTypes.object,
    changed: PropTypes.func
}
export default withClass(Person,classes.Person)