/* global localStorage */
import axios from "axios";

const APIURL = "https://wangjin.me:5319";

axios.defaults.headers.common = {
    Authorization: localStorage.getItem("iwj_token")
};

class API {
    // TODO: Add global warning/error message if API fails.
    static get (URL) {
        return axios.get(APIURL + URL);
    }
    static post (URL, body) {
        return axios.post(APIURL + URL, body);
    }
}

export default API;
