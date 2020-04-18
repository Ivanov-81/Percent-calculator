import {
    ADD_EVENT
} from "../js/constants";

const defaultState = {
    event: null,
};

const event = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_EVENT :
            return Object.assign({}, state, {
                event: action.event
            });
        default:
            return state;
    }

};

export default event;
