const initState = {
    hideEverything: false
};

const JDataReducer = (state = initState, action) => {
    switch (action.type) {
    case "SHOW_HIDE_EVERYTHING":
        state = {
            ...state,
            hideEverything: !state.hideEverything
        };
        break;
    default:
        break;
    }
    return state;
};

export default JDataReducer;
