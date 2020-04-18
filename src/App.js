import React from 'react';
import {Router} from "react-router-dom";
import {createBrowserHistory} from 'history';

import Notifier from "./js/Notifier";
import Main from "./containers/Main";

import './App.css';

const history = createBrowserHistory();

export default function App() {
    return (
        <Router history={history}>
            <Notifier/>
            <Main/>
        </Router>
    );
}