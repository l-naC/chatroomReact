import React from 'react';
import './App.css';
import {Link, Route, Switch} from "react-router-dom";
import Home from './views/Home';
import About from './views/About';

const Header = () => (
    <nav className="navbar">
        <ul className="navbar-list clearfix App-ul">
            <li className="navbar-item App-li"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
            <li className="navbar-item App-li"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
        </ul>
    </nav>
)

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
            <Route If condition={true} exact path={`${process.env.PUBLIC_URL}/about`} component={About}/>
        </Switch>
    </main>
)

const App = () => (
    <div>
        <Header/>
        <Main/>
    </div>
)

export default App;
