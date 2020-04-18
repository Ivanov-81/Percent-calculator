import {
    ADD_PUSH,
    ADD_TITLE,
    ENQUEUE_SNACKBAR,
    CLOSE_SNACKBAR,
    REMOVE_SNACKBAR,
} from "../js/constants";

export const enqueueSnackbar = (notification) => {

    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key) => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = (key) => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const addTitle = (title) => ({
    type: ADD_TITLE,
    title
});

export const addEvent = (push) => ({
    type: ADD_PUSH,
    push
});

export const addPush = (push) => ({
    type: ADD_PUSH,
    push
});