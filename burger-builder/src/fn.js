const fn = (store )=>{
    return (next) => {
        return (action) =>{
            console.log('in action', action);
            const result = next(action);
            return result;
        }
    }
}

const nextFn = ()=>{console.log('in next fn')}
fn({key:1})(nextFn)({key:'action'})