import React,{Component} from 'react'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as authActions from '../../store/actions/index'
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as utility from './../../shared/utility'
import {Redirect} from 'react-router-dom'

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp:false
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.isSignUp)

    }

    switchAuthModeHandler = (event)=>{
        event.preventDefault()
        this.setState({isSignUp: !this.state.isSignUp})
}


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = utility.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }


    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath('/')
        }
    }


    render() {

        let form = <Spinner/>
        let errorMessage=null
        if(!this.props.loading){
            const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            form = (
                <form onSubmit={this.submitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp?'Sign In':'Sign Up'}</Button>
                </form>

            );

           if(this.props.error){
                errorMessage = (<p>{this.props.error.message}</p>)
            }
        }

        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect =  <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.AuthData}>
                {authRedirect}
                <h4>Authenticate</h4>
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken!=null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.bgr.building,
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        onAuth: (email,password, isSignUp)=>dispatch(authActions.auth(email,password, isSignUp)),
        onSetAuthRedirectPath: (path)=> dispatch(authActions.setAuthRedirectPath(path))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);