import axios from "axios";
axios.defaults.baseURL = 'https://test-api-react.vercel.app/';
//axios.defaults.baseURL = 'http://localhost:5000/api';
const http = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}

export default http;