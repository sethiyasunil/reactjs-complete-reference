import * as actionTypes from './actionTypes';
import axios from 'axios';
import {dispatch} from 'redux'
export const authSuccess = (idToken, userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    };

}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logout=()=>{
    return {
        type:  actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        }, expiresIn*1000);
    }
}


export const auth = (email, password, isSignUp) => {

    return dispatch =>{
        let authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHMVXDYGqUUQO8VR30wz4nJeGGi6oQNfc"
        if(!isSignUp){
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHMVXDYGqUUQO8VR30wz4nJeGGi6oQNfc"
        }

        axios.post(authUrl,{
            email: email,
            password:password,
            returnSecureToken: true
        }).then(response=>{
            const expirationDate = new Date(new Date().getTime()+ response.data.expiresIn*1000)
            localStorage.setItem('idToken', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)

            dispatch(checkAuthTimeout(response.data.expiresIn))
            dispatch(authSuccess(response.data.idToken, response.data.localId))

        }).catch(error=>{
            dispatch(authFail(error))

        })

        dispatch(authStart())
    }
}

export const setAuthRedirectPath = (path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };

}

export const authCheckState = () =>{
    return dispatch =>{
        let idToken = localStorage.getItem('idToken')
        if(!idToken){
            dispatch(logout())
        }else{
            let expirationDate = new Date(localStorage.getItem('expirationDate'))
            let expiresIn = (expirationDate.getTime() - new Date().getTime())/1000
            let localId = localStorage.getItem('userId')
            if(expiresIn<=0){
                dispatch(logout())
            }else{
                dispatch(checkAuthTimeout(expiresIn))
                dispatch(authSuccess(idToken, localId))
            }
        }
    }
}