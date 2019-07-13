import axios from "axios";
import Config from "../config/config";
import { toast } from "react-toastify";

import { createStore } from "redux";
import JDataReducer from "../reducers/JDataReducer";

let jData = createStore(JDataReducer);

class API {
    _prepareAPICall (authorizationException = false) {
        if (jData.getState().loginStatus || authorizationException) {
            axios.defaults.headers.common = {
                Authorization: Config.APIKey,
                UserAuthKey: jData.getState().userAuthKey
            };
            return Promise.resolve();
        } else {
            toast.error("You are not logged in.");
            return Promise.reject("Not authorized to call API.");
        }
    }

    _handleAPIResponse (APIRequest) {
        return APIRequest.then(
            // Successful API call
            APIResponse => {
                if (APIResponse.data.metadata.status === false) {
                    toast.warn(`Warning: ${APIResponse.data.metadata.message}`);
                    return Promise.reject(APIResponse.data.metadata.message);
                } else {
                    return Promise.resolve(APIResponse.data.data);
                }
            },
            failure => {
                let failureResponse = failure.response;
                let errorMessage = failureResponse.data.metadata.message;
                if (failureResponse.status === 500) {
                    toast.error(`There's a technical problem with our server. Please try again later. Error: ${errorMessage}`);
                    return Promise.reject(`There's a technical problem with our server. Please try again later. Error: ${errorMessage}`);
                } else if (failureResponse.status === 401) {
                    toast.error(`Not authorized: ${errorMessage}`);
                    jData.dispatch({
                        type: "UPDATE_LOGIN_STATUS",
                        newStatus: false
                    });
                    return Promise.reject(errorMessage);
                } else {
                    toast.error(`Server encountered a problem: ${errorMessage}`);
                    return Promise.reject(failure);
                }
            });
    }

    static get (URL) {
        return API.prototype._prepareAPICall()
            .then(() =>
                API.prototype._handleAPIResponse(axios.get(Config.APIURL + URL)),
            failure =>
                Promise.reject(failure)
            );
    }

    static post (URL, body) {
        // Exception for authorization check: login
        let loginAPI = URL === "/account/login";
        return API.prototype._prepareAPICall(loginAPI)
            .then(() =>
                API.prototype._handleAPIResponse(axios.post(Config.APIURL + URL, body)));
    }
}

export default API;
