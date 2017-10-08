import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,	IndexRoute,	browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import * as firebase from 'firebase';

import rootReducer from './reducers';

import App from './components/App';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUWJ-Uc0dvvZ6Ou6_rUM0Mdtzp3oYAIeU",
    authDomain: "csihackathon-10f11.firebaseapp.com",
    databaseURL: "https://csihackathon-10f11.firebaseio.com",
    projectId: "csihackathon-10f11",
    storageBucket: "csihackathon-10f11.appspot.com",
    messagingSenderId: "645969814504"
};
firebase.initializeApp(config);

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, promise, logger));


ReactDOM.render((<Provider store={store}>
					<Router history = { browserHistory }>
						<Route path = "/" component = { App } />
					</Router>
				</Provider>), document.getElementById('app'));