import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {SnackbarProvider} from "notistack"
import * as serviceWorker from './serviceWorker'
import allReducers from "./redusers"

import {addEvent} from "./actions/actionCreator"

import App from './App';

import './index.css';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js',{scope: '/'})
            .then(registration => {
                console.log('SW registered!!!');
                // registration.pushManager.subscribe({userVisibleOnly: true});
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            })
    });
} else {
    console.log('Текущий браузер не поддерживает service worker-ы.');
}

window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    store.dispatch(addEvent(e));
});

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            hideIconVariant={false}
            preventDuplicate
        >
            <App/>
        </SnackbarProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
