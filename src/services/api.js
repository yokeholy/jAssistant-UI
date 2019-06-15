import axios from "axios";
import Config from "../config/config";

axios.defaults.headers.common = {
    Authorization: Config.APIKey
};

class API {
    // TODO: Add global warning/error message if API fails.
    static get (URL) {
        return axios.get(Config.APIURL + URL);
    }
    static post (URL, body) {
        return axios.post(Config.APIURL + URL, body);
    }
}

export default API;
