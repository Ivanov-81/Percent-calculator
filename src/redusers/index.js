import { combineReducers } from 'redux'

import App from './app'
import Event from './event'
import Snackbar from './snackbar'

const allReducers = combineReducers({
    app: App,
    event: Event,
    snackbar: Snackbar
});

export default allReducers;