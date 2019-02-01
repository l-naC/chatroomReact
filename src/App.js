import React from 'react';
import './App.css';
import {Link, Route, Switch} from "react-router-dom";
import Home from './views/Home';
import About from './views/About';

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
            <Route If condition={true} exact path={`${process.env.PUBLIC_URL}/about`} component={About}/>
        </Switch>
    </main>
)

const App = () => (
    <div className="">
        <Header/>
        <Main/>
    </div>
)

export default App;
