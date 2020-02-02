import axios from 'axios';

const instance = axios.create({
   baseUrl: 'http://127.0.0.1:8000/api/v1/'
});
instance.baseUrl = 'http://127.0.0.1:8000/api/v1/';

export default instance;
