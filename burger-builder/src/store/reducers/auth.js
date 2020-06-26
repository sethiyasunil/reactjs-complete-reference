import * as actionTypes from '../actions/actionTypes';
import * as utility from '../utility'

const initialState={
    idToken:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}

function authStart(state,action) {
    return utility.updateObject(state, {error: null, loading: true});
}

function authFail(state,action) {
    return utility.updateObject(state,{error:action.error,loading:false});
}

function authSuccess(state,action) {
    return utility.updateObject(state,{
        userId: action.userId,
        idToken: action.idToken,
        error:null,
        loading:false
    })
}

function authLogout(state,action){
    localStorage.removeItem('idToken')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return utility.updateObject(state,{
        userId:null,
        idToken: null
    })
}

function setAuthRedirectPath(state,action){
    return utility.updateObject(state,{
        authRedirectPath:action.path
    })
}

const reducer = (state = initialState, action)=>{


    switch(action.type){
        case actionTypes.AUTH_START:  return authStart(state,action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action)
        default: return state
    }

}


export default reducer