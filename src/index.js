import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import * as firebase from 'firebase';
import App from './App';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCe5ZRFsJUzpN761c55q2A0KJifrIaAWH0",
    authDomain: "chat-room-70b95.firebaseapp.com",
    databaseURL: "https://chat-room-70b95.firebaseio.com",
    projectId: "chat-room-70b95",
    storageBucket: "chat-room-70b95.appspot.com",
    messagingSenderId: "317799036206"
};
// eslint-disable-next-line to ignore the next line
firebase.initializeApp(config);

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App/>
    </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
