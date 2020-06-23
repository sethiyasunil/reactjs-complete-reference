import * as actionTypes from './actionTypes'


export const saveResult = (result)=>{
    return {type:actionTypes.STORE_RESULT,result:result};
}

export const storeResult = (result)=>{
    console.log('in actins.js storeResults ', result)
    return (dispatch)=>{
        console.log('in actins.js in dispatch' , dispatch )
            setTimeout(()=>{
                console.log('in actins.js in timeout' , result, dispatch)
                return dispatch(saveResult(result))
            }, 2000);
    }
}


export const deleteResult = (id)=>{
    return {type:actionTypes.DELETE_RESULT,id:id}
}