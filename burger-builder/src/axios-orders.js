import axios from 'axios'

const instance = axios.create({
    baseURL:"https://burger-9b8d8.firebaseio.com/"
})

export default instance;