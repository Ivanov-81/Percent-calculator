import {
    ADD_PUSH,
    ADD_TITLE
} from "../js/constants";

const defaultState = {
    title: "",
    push: []
};

const reports = (state = defaultState, action) => {

    switch (action.type) {
        case ADD_TITLE :
            return Object.assign({}, state, {
                title: action.title
            });
        case ADD_PUSH :
            return Object.assign({}, state, {
                push: action.push
            });
        default:
            return state;
    }

};

export default reports;
