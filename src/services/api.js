/* global localStorage: true */
import axios from "axios";
import Config from "../config/config";
import { toast } from "react-toastify";

class API {
    _prepareAPICall (authorizationException = false) {
        let loginStatus = typeof localStorage.getItem("jAssistantUserAuthKey") === "string";
        if (loginStatus || authorizationException) {
            axios.defaults.headers.common = {
                Authorization: Config.APIKey,
                UserAuthKey: localStorage.getItem("jAssistantUserAuthKey")
            };
            return Promise.resolve();
        } else {
            toast.error("You are not logged in.");
            return Promise.reject("Not authorized to call API.");
        }
    }

    // TODO: Add global warning/error message if API fails.
    static get (URL) {
        return API.prototype._prepareAPICall()
            .then(() =>
                axios.get(Config.APIURL + URL),
            failure =>
                Promise.reject(failure)
            );
    }

    static post (URL, body) {
        // Exception for authorization check: login
        let loginAPI = URL === "/account/login";
        return API.prototype._prepareAPICall(loginAPI)
            .then(() =>
                axios.post(Config.APIURL + URL, body),
            failure =>
                Promise.reject(failure)
            );
    }
}

export default API;
