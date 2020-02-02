import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
});

instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN V2";

export default instance