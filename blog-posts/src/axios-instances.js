import axios from 'axios'

const instance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    //headers.common['Authorization']='TOKEN-VALUE',
    //headers.post['Content-Type'] = 'application/json'
})

axios.interceptors.request.use(request =>{
    console.log(request)
    return request;
},error=>{
    console.log(error)
    return Promise.reject(error)
});

axios.interceptors.response.use(response =>{
    console.log(response)
    return response;
},error=>{
    console.log(error)
    return Promise.reject(error)
});



export default instance