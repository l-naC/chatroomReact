import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import * as firebase from 'firebase';

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

const Header = () => (
    <nav className="navbar">
        <ul className="navbar-list clearfix">
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
        </ul>
    </nav>
)

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
            <Route exact path={`${process.env.PUBLIC_URL}/about`} component={About}/>
        </Switch>
    </main>
)

const App = () => (
    <div className="">
        <Header/>
        <Main/>
    </div>
)

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App/>
    </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
