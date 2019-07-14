/* global localStorage: true */
const initState = {
    appName: localStorage.getItem("jAssistantAppName") || "jAssistant",
    hideEverything: false,
    loginStatus: typeof localStorage.getItem("jAssistantUserAuthKey") === "string",
    userAuthKey: localStorage.getItem("jAssistantUserAuthKey") || null
};

const JDataReducer = (state = initState, action) => {
    switch (action.type) {
    case "SHOW_HIDE_EVERYTHING":
        state = {
            ...state,
            hideEverything: !state.hideEverything
        };
        break;
    case "UPDATE_LOGIN_STATUS":
        if (action.newStatus) {
            state = {
                ...state,
                loginStatus: true,
                userAuthKey: action.newAuthKey
            };
            localStorage.setItem("jAssistantUserAuthKey", action.newAuthKey);
        } else {
            state = {
                ...state,
                loginStatus: false,
                userAuthKey: null
            };
            localStorage.removeItem("jAssistantUserAuthKey");
        }
        break;
    case "UPDATE_APP_NAME":
        state = {
            ...state,
            appName: action.newAppName
        };
        localStorage.setItem("jAssistantAppName", action.newAppName);
        break;
    default:
        break;
    }
    return state;
};

export default JDataReducer;
