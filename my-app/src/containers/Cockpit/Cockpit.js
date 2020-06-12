import React from "react";
import  classes from './Cockpit.css'
import AuthContext from '../../context/auth-context'

const cockpit = (props)=>{

    const assignedClasses =[]
    let btnClass=null
    if(props.showPersons){
        btnClass=classes.Red
    }

    if(props.personsLength<=2){
        assignedClasses.push(classes.red)
    }
    if(props.personsLength<=1){
        assignedClasses.push(classes.bold)
    }

    return (
        <div className='Cockpit'>
            <h1 className={assignedClasses.join( ' ' )}>{props.title}</h1>
            <button onClick={props.clicked} className={btnClass}>Toggle Person</button>
            <AuthContext.Consumer>
                {
                    (context)=>{
                        return !context.authenticated?<button onClick={context.login}>Login</button>:null;
                    }
                }
            </AuthContext.Consumer>

        </div>
    )
}


export default React.memo(cockpit)
