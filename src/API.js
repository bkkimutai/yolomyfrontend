import axios from 'axios'

let options = {
    baseURL:'https://yolomyapi.onrender.com/api/'
}
export default axios.create(options);
